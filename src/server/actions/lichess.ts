"use server"

// TODO add timeout of 60 seconds if response is 429

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { challenge, getLichessToken, getLichessUser, verifier } from "@/lib/lichessOAuth";

const clientId = process.env.LICHESS_CLIENT_ID as string
const url = process.env.WEBSITE_URL as string

export const logout = async () => {
  console.log('logging out')

  const cookieStore = cookies()
  cookieStore.delete('lichessToken')
  cookieStore.delete('codeVerifier')
}

export const login = async () => {
  const cookieStore = cookies()

  if (cookieStore.has('lichessToken')) {
    redirect('/chessboard')
  }

  cookieStore.set('codeVerifier', verifier)

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
  const cookieStore = cookies()

  if (cookieStore.has('lichessToken')) {
    redirect('/chessboard')
  }

  const verifier = cookieStore.get('codeVerifier')?.value

  const lichessToken = await getLichessToken({
    redirectUri: `${url}/callback`,
    clientId,
    authCode: code,
    codeVerifier: verifier
  })

  if (lichessToken.access_token) {
    cookies().set('lichessToken', lichessToken.access_token)
    return await getLichessUser(lichessToken.access_token)
  }

  // if (!lichessToken.access_token) {
  //   console.error('Failed getting token')
  //   redirect('/error')
  // }
}
