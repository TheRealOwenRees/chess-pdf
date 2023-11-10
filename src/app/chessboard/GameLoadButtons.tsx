import { handleClearGame, handleLoadPGN } from "@/handlers/pgnHandlers";
import { useGameContext } from "@/context/GameContext";

const GameLoadButtons = () => {
  const { gameDispatch } = useGameContext()
  return (
    <div className="flex w-full justify-between mt-8 mb-4 gap-4 items-start">
      <label htmlFor="fileInput"
             id="fileInputLabel"
             className="text-xs text-primary-500 font-semibold bg-white border border-primary-500 rounded-2xl py-2.5 px-4 cursor-pointer"
      >
        Load PGN
      </label>
      <input className="hidden"
             type="file"
             id="fileInput"
             accept=".pgn"
             onChange={(e) => handleLoadPGN(e, gameDispatch)}
      />
      <button type="button"
              className="text-xs text-primary-500 font-semibold border border-primary-500 rounded-2xl py-2.5 px-4"
              onClick={(e) => handleClearGame(e, gameDispatch)}>
        Clear Game
      </button>
    </div>
  )
}

export default GameLoadButtons