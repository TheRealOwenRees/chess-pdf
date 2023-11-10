import { handleSavePDF, handleSavePGN } from "@/handlers/pgnHandlers";
import { useGameContext } from "@/context/GameContext";

const GameSaveButtons = () => {
  const { gameState } = useGameContext()
  return (
    <div className="flex flex-col sm:flex-row w-full gap-4 justify-between mt-8">
      <button type="button"
              disabled={!gameState.pgn}
              className="text-xs text-primary-500 font-semibold border border-primary-500 rounded-2xl py-2.5 px-4"
              onClick={(e) => handleSavePGN(e, gameState)}>
        Save PGN
      </button>
      <button type="button"
              disabled={!gameState.pgn}
              className="text-xs text-primary-500 font-semibold border border-primary-500 rounded-2xl py-2.5 px-4"
              onClick={(e) => handleSavePDF(e, gameState)}>
        Save as PDF
      </button>

    </div>
  )
}

export default GameSaveButtons