import { login, logout } from "@/server/actions/lichess";
import { lichessUserAtom } from "@/atoms";
import { useSetAtom } from "jotai";

const useLichessOAuth = () => {
  const setLichessUser = useSetAtom(lichessUserAtom)

  const lichessLogin = async () => {
    await login()
  }

  const lichessLogout = async () => {
    await logout()
    setLichessUser({ username: '', loggedIn: false })
  }

  const lichessGetUserStudies = async () => {
    console.log('getting studies')
  }

  return { lichessLogin, lichessLogout, lichessGetUserStudies };
}

export default useLichessOAuth;
