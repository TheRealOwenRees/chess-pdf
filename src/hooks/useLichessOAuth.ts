import { login } from "@/server/actions/lichess";

const useLichessOAuth = () => {
  const lichessLogin = async () => {
    await login()
  }

  return { lichessLogin };
}

export default useLichessOAuth;
