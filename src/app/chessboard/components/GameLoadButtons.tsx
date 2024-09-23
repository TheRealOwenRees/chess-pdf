import { useAtom, useAtomValue } from "jotai/index";
import { gameAtom, lichessUserAtom } from "@/atoms";

import { handleClearGame, handleLoadPGN } from "@/handlers/pgnHandlers";
import LichessLogo from "@/app/components/LichessLogo";

import useLichessOAuth from "@/hooks/useLichessOAuth";

const GameLoadButtons = () => {
  const [_, gameDispatch] = useAtom(gameAtom)
  const { lichessLogin, lichessLogout } = useLichessOAuth()

  const lichessUser = useAtomValue(lichessUserAtom)

  const lichessLogoutButton = lichessUser.loggedIn && (
    <button className="btn btn-outline btn-primary hover:btn-primary group" onClick={lichessLogout}>
      Logout {lichessUser.username}
    </button>
  )

  return (
    <div className="flex flex-col w-full justify-between gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button className="btn btn-outline btn-primary hover:btn-primary group" onClick={lichessLogin}>
          <LichessLogo className="w-5 h-5 fill-primary stroke-primary group-hover:fill-white group-hover:stroke-white" />
            Import from LiChess
          </button>
        {lichessLogoutButton}
      </div>
      <p className="text-center">OR</p>
      <div className="flex items-center flex-wrap justify-between w-full mb-4 gap-4">
        <input
          type="file"
          id="fileInput"
          className="file-input file-input-md file-input-bordered file-input-primary max-w-xs"
          onChange={(e) => handleLoadPGN(e, gameDispatch)}
        />
        <button className="btn btn-primary w-full md:w-1/4"
                onClick={(e) => handleClearGame(e, gameDispatch)}>
          Clear Game
        </button>
      </div>
    </div>
  )
}

export default GameLoadButtons
