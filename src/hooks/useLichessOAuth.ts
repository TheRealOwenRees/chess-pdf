import { useAtom } from "jotai";

import { lichessUserAtom } from "@/atoms";
import {
  checkLogin,
  getChapters,
  getUserStudies,
  login,
  logout,
} from "@/server/actions/lichess";

const useLichessOAuth = () => {
  const [lichessUser, setLichessUser] = useAtom(lichessUserAtom);

  const lichessLoggedInCheck = async () => {
    const response = await checkLogin();
    if (response.loggedIn) {
      setLichessUser({ username: response.username, loggedIn: true });
    } else {
      setLichessUser({ username: "", loggedIn: false });
    }
  };

  const lichessLogin = async () => {
    await login();
  };

  const lichessLogout = async () => {
    await logout();
    setLichessUser({ username: "", loggedIn: false });
  };

  const lichessGetUserStudies = async () => {
    return await getUserStudies(lichessUser.username);
  };

  const lichessAllChapters = async (studyId: string) => {
    return await getChapters(studyId);
  };

  return {
    lichessLogin,
    lichessLogout,
    lichessGetUserStudies,
    lichessAllChapters,
    lichessLoggedInCheck,
  };
};

export default useLichessOAuth;
