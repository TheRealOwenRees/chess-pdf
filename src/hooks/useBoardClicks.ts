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
    const movesList = document.querySelector(".lpv__moves")
    if (!boardButtons || !movesList) return

    const clickHandlerDelay = () => {
      setTimeout(() => handleClick(), 250);
    }

    boardButtons?.addEventListener('click', handleClick)
    boardButtons?.addEventListener('touchstart', handleClick)
    movesList.addEventListener('click', clickHandlerDelay);
    movesList.addEventListener('touchstart', clickHandlerDelay);


    return () => {
      boardButtons?.removeEventListener('click', handleClick)
      boardButtons?.removeEventListener('touchstart', handleClick)
      movesList.removeEventListener('click', clickHandlerDelay);
      movesList.removeEventListener('touchstart', clickHandlerDelay);
    }
  })
}