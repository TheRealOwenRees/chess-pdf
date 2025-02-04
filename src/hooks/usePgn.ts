import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { useAtom } from "jotai/index";
import { toast } from "react-toastify";

import { gameAtom } from "@/atoms";
import { Header } from "@/types";
import { downloadPDF } from "@/utils/pdfUtils";
import { buildPgnString, getHeaders } from "@/utils/pgnUtils";
import { downloadString } from "@/utils/stringUtils";

const usePgn = () => {
  const [gameState, gameDispatch] = useAtom(gameAtom);

  const clearPgn = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.value = "";
    gameDispatch({ type: "CLEAR_GAME" });
  };

  const loadPgn = (e: ChangeEvent<HTMLInputElement>) => {
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
      const fileInput = document.getElementById(
        "fileInput",
      ) as HTMLInputElement;
      fileInput.value = "";
      e.target.files = null;
      toast.error("Not a supported file type", {
        toastId: "file-type-error",
      });
    }
  };

  const savePgn = () => {
    const pgnString = buildPgnString(gameState);
    downloadString(pgnString, "game.pgn");
  };

  const saveAsPdf = async (
    setGeneratingPDF: Dispatch<SetStateAction<boolean>>,
  ) => {
    setGeneratingPDF(true);
    const pgnString = buildPgnString(gameState);
    const { diagrams } = gameState;

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
      const response = await fetch(`${apiBaseUrl}/pdf`, {
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

      downloadPDF(await response.blob());
      toast.success("PDF generated successfully", {
        toastId: "pdf-success",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Something went wrong generating the PDF", {
          toastId: "pdf-error",
        });
      }
    } finally {
      setGeneratingPDF(false);
    }
  };

  const updateHeaders = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    e.preventDefault();
    const updatedHeaders = {
      ...gameState.headers,
      [fieldName]: e.target.value,
    } as Header;
    gameDispatch({ type: "SET_HEADERS", payload: updatedHeaders });
  };

  return {
    clearPgn,
    loadPgn,
    savePgn,
    saveAsPdf,
    updateHeaders,
  };
};

export default usePgn;
