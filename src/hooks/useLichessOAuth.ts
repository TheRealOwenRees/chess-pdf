import { getUserStudies, login, logout } from "@/server/actions/lichess";
import { lichessUserAtom } from "@/atoms";
import { useAtom } from "jotai";

const useLichessOAuth = () => {
  const [lichessUser, setLichessUser] = useAtom(lichessUserAtom)

  const lichessLogin = async () => {
    await login()
  }

  const lichessLogout = async () => {
    await logout()
    setLichessUser({ username: '', loggedIn: false })
  }

  const lichessGetUserStudies = async () => {
    const response = await getUserStudies(lichessUser.username)
    console.log(response)
    return response
  }

  return { lichessLogin, lichessLogout, lichessGetUserStudies };
}

export default useLichessOAuth;
