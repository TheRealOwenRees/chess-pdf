import { cookies } from "next/headers";

class LichessCookieManager {
  private static instance: LichessCookieManager

  private constructor() {}

  public static getInstance(): LichessCookieManager {
    if (!LichessCookieManager.instance) {
      LichessCookieManager.instance = new LichessCookieManager()
    }
    return LichessCookieManager.instance
  }

  async setCodeVerifierCookie(verifier: string) {
      cookies().set('codeVerifier', verifier)
  }

  async setLichessTokenCookie(token: string) {
      cookies().set('lichessToken', token)
  }

  async getVerifier() {
      return cookies().get('codeVerifier')?.value
  }

  async getLichessToken() {
      return cookies().get('lichessToken')?.value
  }

  async deleteLichessCookies() {
      cookies().delete('lichessToken')
      cookies().delete('codeVerifier')
  }
}

const lichessCookieManager = LichessCookieManager.getInstance()

export default lichessCookieManager;
