import crypto from "crypto";

interface IGetLichessToken {
  redirectUri: string
  clientId: string
  authCode: string
  codeVerifier: string | undefined
}

interface ILichessToken {
  token_type: string
  access_token: string
  expires_in: number
}

const base64UrlEncode = (str: Buffer) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer: string) => crypto.createHash('sha256').update(buffer).digest()
const createVerifier = () => base64UrlEncode(crypto.randomBytes(32))
const createChallenge = (verifier: string) => base64UrlEncode(sha256(verifier))

export const verifier = createVerifier()
export const challenge = createChallenge(verifier)

/**
 * Get the Lichess access token by the authorization code from Lichess
 * @param redirectUri
 * @param clientId
 * @param authCode
 * @param codeVerifier
 * @returns ILichessToken
 */
export const getLichessToken = async ({ redirectUri, clientId, authCode, codeVerifier }: IGetLichessToken): Promise<ILichessToken> => {
  const response = await fetch('https://lichess.org/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      client_id: clientId,
      code: authCode,
      code_verifier: codeVerifier
    })
  })
  return await response.json()
}

/**
 * Get the Lichess User by a valid access token
 * @param token
 */
export const getLichessUser = async (token: string) => {
  const response = await fetch('https://lichess.org/api/account', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return await response.json()
}

/**
 * Get the Lichess User Studies by a valid access token
 * @param token
 * @param username
 */
export const getLichessUserStudies = async (token: string, username: string) => {
  return await fetch(`https://lichess.org/api/study/by/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
