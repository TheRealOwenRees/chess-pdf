import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";

import { toast } from "react-toastify";

import { logError } from "@/server/actions/errorLogging";
import { GameProps, IChapter } from "@/types";
import { downloadPDF } from "@/utils/pdfUtils";
import { buildPgnString, getHeaders } from "@/utils/pgnUtils";
import { downloadString } from "@/utils/stringUtils";

export const handleClearGame = (
  e: MouseEvent<HTMLButtonElement>,
  gameDispatch: any,
) => {
  // TODO fix any type
  e.preventDefault();
  const fileInput = document.getElementById("fileInput") as HTMLInputElement;
  fileInput.value = "";
  gameDispatch({ type: "CLEAR_GAME" });
};

// loads PGN from imported Lichess study chapter
export const handleImportPGNFromLichess = (
  chapter: IChapter,
  gameDispatch: any,
) => {
  if (!chapter.chapterId) {
    const errorMessage = JSON.parse(chapter.pgn).error;
    console.error(errorMessage);
    toast.error("This study does not allow exporting of it's games!", {
      toastId: "lichess-import-error",
    });
  }

  if (chapter.chapterId) {
    const headers = getHeaders(chapter.pgn);
    gameDispatch({
      type: "SET_GAME",
      payload: { pgn: chapter.pgn, headers: headers },
    });
    toast.success("Game imported successfully", {
      toastId: "lichess-import-success",
    });
  }
};

// loads PGN from uploaded file
export const handleLoadPGN = (
  e: ChangeEvent<HTMLInputElement>,
  gameDispatch: any,
) => {
  // TODO fix any type
  e.preventDefault();
  const selectedFile = e.target.files && e.target.files[0];

  if (selectedFile && selectedFile.name.endsWith(".pgn")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const pgnData = e.target?.result;
      let pgnString;

      if (pgnData) {
        if (typeof pgnData === "string") {
          pgnString = pgnData;
        } else {
          pgnString = new TextDecoder().decode(pgnData);
        }
      }

      if (pgnString) {
        const headers = getHeaders(pgnString);
        gameDispatch({
          type: "SET_GAME",
          payload: { pgn: pgnString, headers: headers },
        });
      } else {
        gameDispatch({ type: "CLEAR_GAME" });
      }
    };
    reader.readAsText(selectedFile);
  } else {
    gameDispatch({ type: "CLEAR_GAME" });
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.value = "";
    e.target.files = null;
    toast.error("Not a supported file type", {
      toastId: "file-type-error",
    });
  }
};

export const handleSavePGN = (
  e: MouseEvent<HTMLButtonElement>,
  gameState: GameProps,
) => {
  e.preventDefault();
  const pgnString = buildPgnString(gameState);
  downloadString(pgnString, "game.pgn");
};

export const handleSavePDF = async (
  e: MouseEvent<HTMLButtonElement>,
  gameState: GameProps,
  setGeneratingPDF: Dispatch<SetStateAction<boolean>>,
) => {
  e.preventDefault();
  setGeneratingPDF(true);
  const pgnString = buildPgnString(gameState);
  const { diagrams } = gameState;

  try {
    const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
    const response = await fetch(`${apiBaseURL}/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pgn: pgnString,
        diagrams: diagrams,
        diagramClock: gameState.diagramClock,
      }),
    });
    downloadPDF(await response.blob()); // TODO add response here? Make sure it opened before setting message
    toast.success("PDF generated successfully", {
      toastId: "pdf-success",
    });
  } catch (error: any) {
    if (error instanceof Error) {
      const response = await logError(error.message);
      if (response) {
        toast.error("Something went wrong generating the PDF", {
          toastId: "pdf-error",
        });
      }
    }
  } finally {
    setGeneratingPDF(false);
  }
};
