import { useAtom } from "jotai";
import { gameAtom } from "@/atoms";

import { useState } from "react";
import { handleSavePDF, handleSavePGN } from "@/handlers/pgnHandlers";

const GameSaveButtons = () => {
  const [gameState] = useAtom(gameAtom);

  const [generatingPDF, setGeneratingPDF] = useState(false);
  const savePDFButtonText = generatingPDF ? "Generating..." : "Save as PDF";

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 justify-between mt-8 mb-4">
      <button disabled={!gameState.pgn}
              className="btn btn-primary btn-outline"
              onClick={(e) => handleSavePGN(e, gameState)}>
        Save PGN
      </button>
      <button disabled={!gameState.pgn && !generatingPDF}
              className="btn btn-primary btn-outline"
              onClick={(e) => handleSavePDF(e, gameState, setGeneratingPDF)}>
        {savePDFButtonText}
      </button>
    </div>
  );
};

export default GameSaveButtons;
