import { RefObject, useEffect } from "react";
import { useGameContext } from "@/context/GameContext";
import { diagramCheckboxCheckedHandler, diagramCheckboxDisabledHandler } from "@/handlers/diagramCheckboxHandlers";

// TODO write tests for this hook
const useMoveListClicks = (checkboxRef: RefObject<HTMLInputElement>) => {
  const { gameState } = useGameContext()
  const { diagrams } = gameState

  useEffect(() => {
    const clickHandler = () => {
      setTimeout(() => {
        diagramCheckboxDisabledHandler(checkboxRef)
        diagramCheckboxCheckedHandler(diagrams, checkboxRef)
      }, 250)
    }

    if (gameState && gameState.pgn) {
      const sanElements = document.querySelectorAll("san")
      sanElements.forEach((sanElement) => {
        sanElement.addEventListener("click", clickHandler)
      })
    }

    return () => {
      const sanElements = document.querySelectorAll("san")
      sanElements.forEach((sanElement) => {
        sanElement.removeEventListener("click", clickHandler)
      })
    }
  }, [gameState.pgn, diagrams])
}

export default useMoveListClicks;