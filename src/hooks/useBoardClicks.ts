import { useAtom } from "jotai";
import { gameAtom } from "@/atoms";
import { RefObject, useEffect } from "react";
import { lpvDiagramCheckboxDisabledHandler, lpvDiagramCheckboxCheckedHandler } from "@/handlers/diagramCheckboxHandlers";

export const useLpvBoardButtonClicks = (checkboxRef: RefObject<HTMLInputElement>, lpvRef: RefObject<any>) => {
  const [gameState] = useAtom(gameAtom)
  const { diagrams } = gameState

  const boardEventListener = () => {
    const variationTags = document.querySelector('variation')
    const moves = [...document.querySelectorAll('move')].filter(m => {
      if (!variationTags) return m.className !== "empty"
      return m.parentNode?.querySelector("variation") && m.className !== "empty";
    })
    const ply = moves.findIndex(m => m.classList.contains('current')) + 1
    return { moves, ply }
  }

  const handleClick = () => {
    const { ply } = boardEventListener()

    lpvDiagramCheckboxDisabledHandler(checkboxRef, ply)
    lpvDiagramCheckboxCheckedHandler(diagrams, checkboxRef, ply)
  }

  useEffect(() => {
    const boardButtons = document.querySelector(".lpv__controls")
    if (!boardButtons) return

    boardButtons?.addEventListener('click', handleClick)
    boardButtons?.addEventListener('touchstart', handleClick)

    return () => {
      boardButtons?.removeEventListener('click', handleClick)
      boardButtons?.removeEventListener('touchstart', handleClick)
    }
  })

  useEffect(() => {
    const movesList = document.querySelector(".lpv__moves")
    if (!movesList) return

    const clickHandler = () => {
      setTimeout(() => handleClick(), 250);
    };

    movesList.addEventListener('click', clickHandler);
    movesList.addEventListener('touchstart', clickHandler);

    return () => {
      movesList.removeEventListener('click', clickHandler);
      movesList.removeEventListener('touchstart', clickHandler);
    };
  })
}