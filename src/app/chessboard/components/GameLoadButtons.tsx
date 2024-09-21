import { useAtom } from "jotai/index";
import { gameAtom } from "@/atoms";

import { handleClearGame, handleLoadPGN } from "@/handlers/pgnHandlers";
import LichessLogo from "@/app/components/LichessLogo";

import useLichessOAuth from "@/hooks/useLichessOAuth";

const GameLoadButtons = () => {
  const [_, gameDispatch] = useAtom(gameAtom)
  const { lichessOAuth } = useLichessOAuth();

  return (
    <div className="flex flex-col w-full items-center justify-between gap-4">
      <button className="btn btn-outline hover:btn-primary group" onClick={lichessOAuth}>
        <LichessLogo className="w-5 h-5 fill-black stroke-black group-hover:fill-white group-hover:stroke-white" />
        Import from LiChess
      </button>
      <p className="text-center">OR</p>
      <div className="flex items-center justify-between w-full mb-4">
        <input
          type="file"
          id="fileInput"
          className="file-input file-input-md file-input-bordered file-input-primary max-w-xs"
          onChange={(e) => handleLoadPGN(e, gameDispatch)}
        />
        <button className="btn btn-primary btn-outline w-full md:w-1/4"
                onClick={(e) => handleClearGame(e, gameDispatch)}>
          Clear Game
        </button>
      </div>
    </div>
  )
}

export default GameLoadButtons
