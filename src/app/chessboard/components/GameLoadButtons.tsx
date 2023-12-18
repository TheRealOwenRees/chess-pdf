import { useAtom } from "jotai/index";
import { gameAtom } from "@/atoms";

import { handleClearGame, handleLoadPGN } from "@/handlers/pgnHandlers";

const GameLoadButtons = () => {
  const [_, gameDispatch] = useAtom(gameAtom)

  return (
    <div className="flex flex-col md:flex-row w-full justify-between mt-8 mb-4 gap-4 items-start">
      <input
        type="file"
        id="fileInput"
        className="file-input file-input-md file-input-bordered file-input-primary max-w-xs"
        accept=".pgn"
        onChange={(e) => handleLoadPGN(e, gameDispatch)}
      />
      <button className="btn btn-primary btn-outline w-full md:w-1/4"
              onClick={(e) => handleClearGame(e, gameDispatch)}>
        Clear Game
      </button>
    </div>
  )
}

export default GameLoadButtons