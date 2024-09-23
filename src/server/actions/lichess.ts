"use server"

// TODO add timeout of 60 seconds if response is 429

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { challenge, getLichessToken, verifier } from "@/lib/lichessOAuth";

export const login = async () => {
  const clientId = process.env.LICHESS_CLIENT_ID as string
  const url = process.env.WEBSITE_URL as string

  cookies().set('codeVerifier', verifier) // TODO change to session storage?

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
  const clientId = process.env.LICHESS_CLIENT_ID as string
  const url = process.env.WEBSITE_URL as string
  const verifier = cookies().get('codeVerifier')?.value

  const lichessToken = await getLichessToken({
    redirectUri: `${url}/callback`,
    clientId,
    authCode: code,
    codeVerifier: verifier
  })

  if (lichessToken.access_token) {
    cookies().set('lichessToken', lichessToken.access_token)
    redirect('/chessboard')
  }

  // if (!lichessToken.access_token) {
  //   console.error('Failed getting token')
  //   redirect('/error')
  // }
}
