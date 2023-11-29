import { Message } from "@/types";

import { useAtom } from "jotai/index";
import { gameAtom } from "@/atoms";

import { Dispatch, SetStateAction, useState } from "react";
import { handleSavePDF, handleSavePGN } from "@/handlers/pgnHandlers";
import { trpc } from "@/utils/trpc";

const GameSaveButtons = ({ setMessage }: { setMessage: Dispatch<SetStateAction<Message>> }) => {
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [gameState] = useAtom(gameAtom);

  const savePDFButtonText = generatingPDF ? "Generating..." : "Save as PDF";
  const errorContact = trpc.discordErrorLog.useMutation();

  return (
    <div className="flex flex-col sm:flex-row w-full gap-4 justify-between mt-8">
      <button type="button"
              disabled={!gameState.pgn}
              className="text-xs text-primary-500 font-semibold border border-primary-500 rounded-2xl py-2.5 px-4"
              onClick={(e) => handleSavePGN(e, gameState)}>
        Save PGN
      </button>
      <button type="button"
              disabled={!gameState.pgn && !generatingPDF}
              className="text-xs text-primary-500 font-semibold border border-primary-500 rounded-2xl py-2.5 px-4"
              onClick={(e) => handleSavePDF(e, gameState, setGeneratingPDF, setMessage, errorContact)}>
        {savePDFButtonText}
      </button>
    </div>
  );
};

export default GameSaveButtons;