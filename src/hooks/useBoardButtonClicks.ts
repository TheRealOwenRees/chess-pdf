import { RefObject, useEffect } from "react";
import {
  lpvDiagramCheckboxDisabledHandler, lpvDiagramCheckboxCheckedHandler
} from "@/handlers/diagramCheckboxHandlers";
import { useGameContext } from "@/context/GameContext";

export const useLpvBoardButtonClicks = (checkboxRef: RefObject<HTMLInputElement>, lpvRef: RefObject<any>) => { // TODO fix any
  const { gameState, gameDispatch } = useGameContext()
  const { diagrams  } = gameState

  useEffect(() => {
    const boardButtons = document.querySelector(".lpv__controls")

    if (!boardButtons) return

    boardButtons?.addEventListener('click', () => {
      let moves = [...document.querySelectorAll('move')].filter(m => m.parentNode?.querySelector('variation') && m.className !== 'empty')
      let ply = moves.findIndex(m => m.classList.contains('current')) + 1
      let fen = lpvRef.current?.curData().fen
      console.log(ply, fen)
      lpvDiagramCheckboxDisabledHandler(checkboxRef, ply)
      lpvDiagramCheckboxCheckedHandler(diagrams, checkboxRef, ply)
    })

    return () => {
      boardButtons?.removeEventListener('click', () => {
        console.log('lpv board button clicked')
      })
    }
  })

}