import { RefObject, useEffect } from "react";
import { diagramCheckboxCheckedHandler, diagramCheckboxDisabledHandler } from "@/handlers/diagramCheckboxHandlers";
import { useGameContext } from "@/context/GameContext";

// TODO write tests for this hook
// Board button group click handler
const useBoardButtonClicks = (checkboxRef: RefObject<HTMLInputElement>) => {
  const { gameState } = useGameContext()
  const { diagrams, pgn } = gameState

   useEffect(() => {
    if (pgn) {
      const boardButtons = document.getElementById("boardButton")
      boardButtons?.addEventListener("click", () => {
        diagramCheckboxDisabledHandler(checkboxRef)
        diagramCheckboxCheckedHandler(diagrams, checkboxRef)
      })

      return () => {
        boardButtons?.removeEventListener("click", () => {
          diagramCheckboxDisabledHandler(checkboxRef)
          diagramCheckboxCheckedHandler(diagrams, checkboxRef)
        })
      }
    }
  });
}

export default useBoardButtonClicks