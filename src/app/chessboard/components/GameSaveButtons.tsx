import { useState } from "react";

import { useAtom } from "jotai";

import { gameAtom } from "@/atoms";
import usePgn from "@/hooks/usePgn";

const GameSaveButtons = () => {
  const [gameState] = useAtom(gameAtom);
  const { savePgn, saveAsPdf } = usePgn();

  console.log(gameState);

  const [generatingPDF, setGeneratingPDF] = useState(false);
  const savePDFButtonText = generatingPDF ? "Generating..." : "Save as PDF";

  return (
    <div className="mb-4 mt-8 flex w-full flex-col justify-between gap-4 md:flex-row">
      <button
        disabled={!gameState.pgn}
        className="btn btn-outline btn-primary"
        onClick={savePgn}
      >
        Save PGN
      </button>
      <button
        disabled={!gameState.pgn && !generatingPDF}
        className="btn btn-outline btn-primary"
        onClick={() => saveAsPdf(setGeneratingPDF)}
      >
        {savePDFButtonText}
      </button>
    </div>
  );
};

export default GameSaveButtons;
