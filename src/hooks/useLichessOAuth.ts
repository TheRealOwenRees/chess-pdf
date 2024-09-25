import { checkLogin, getChapters, getUserStudies, login, logout } from "@/server/actions/lichess";
import { lichessUserAtom } from "@/atoms";
import { useAtom } from "jotai";

const useLichessOAuth = () => {
  const [lichessUser, setLichessUser] = useAtom(lichessUserAtom)

  const lichessLoggedInCheck = async () => {
    const response = await checkLogin()
    if (response.loggedIn) {
      setLichessUser({ username: response.username, loggedIn: true })
    } else {
      setLichessUser({ username: '', loggedIn: false })
    }
  }

  const lichessLogin = async () => {
    await login()
  }

  const lichessLogout = async () => {
    await logout()
    setLichessUser({ username: '', loggedIn: false })
  }

  const lichessGetUserStudies = async () => {
    return await getUserStudies(lichessUser.username)
  }

  const lichessAllChapters = async (studyId: string) => {
    // TODO private study not readable, look into this
    const chapters = await getChapters(studyId)
    console.log(chapters)
    return chapters
  }

  return { lichessLogin, lichessLogout, lichessGetUserStudies, lichessAllChapters, lichessLoggedInCheck };
}

export default useLichessOAuth;
