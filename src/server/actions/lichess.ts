"use server"

// TODO add timeout of 60 seconds if response is 429

import lichessCookieManager from "@/lib/lichessCookieManager";
import { redirect } from "next/navigation";
import {
  challenge,
  accessToken,
  user,
  userStudies,
  verifier,
  studyChapters,
  revokeAccessToken,
} from "@/lib/lichessOAuth";

const clientId = process.env.LICHESS_CLIENT_ID as string
const url = process.env.WEBSITE_URL as string

export const checkLogin = async () => {
  const token = await lichessCookieManager.getLichessToken()

  if (token) {
    const response = await user(token)
    return { username: response.username, loggedIn: true }
  }

  return { username: '', loggedIn: false }
}

export const logout = async () => {
  const token = await lichessCookieManager.getLichessToken() // revoke token
  if (token) {
    await revokeAccessToken(token)
  }
  await lichessCookieManager.deleteLichessCookies() // delete cookies
  return true
}

export const login = async () => {
  const lichessToken = await lichessCookieManager.getLichessToken()

  if (lichessToken) {
    redirect('/chessboard')
  } else {
    await lichessCookieManager.setCodeVerifierCookie(verifier)
  }

  redirect('https://lichess.org/oauth?' + new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: `${url}/callback`,
    scope: 'study:read',
    code_challenge_method: 'S256',
    code_challenge: challenge
  }))
}

export const verifyToken = async (code: string) => {
  const token = await lichessCookieManager.getLichessToken()
  if (token) redirect('/chessboard')

  const verifier = await lichessCookieManager.getVerifier()

  const lichessToken = await accessToken({
    redirectUri: `${url}/callback`,
    clientId,
    authCode: code,
    codeVerifier: verifier
  })

  if (lichessToken.access_token) {
    await lichessCookieManager.setLichessTokenCookie(lichessToken.access_token)
    return await user(lichessToken.access_token)
  }
}

export const getUserStudies = async (username: string) => {
  const token = await lichessCookieManager.getLichessToken()

  if (!token) {
    // TODO error handling, 429 etc
    return
  }

  const response = await userStudies(token, username)
  const text = await response.text()
  return text
    .trim()
    .split('\n')
    .map((line) => JSON.parse(line))
}

export const getChapters = async (studyId: string) => {
  const token = await lichessCookieManager.getLichessToken()

  if (!token) {
    // TODO error handling, 429 etc
    return
  }

  const response = await studyChapters(token, studyId)
  const text = await response.text()
  return text
    .trim()
    .split(/\n{3,}/)
    .map((game) => {
      const siteHeaderText = game.match(/\[Site\s+"([^"]+)"]/)?.[1];
      const chapterId = siteHeaderText?.match(/\/([^\/]+)$/)?.[1];
      return { chapterId, pgn: game}
    })
}
