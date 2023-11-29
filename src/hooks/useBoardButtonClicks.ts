import { useAtom } from "jotai/index";
import { gameAtom } from "@/atoms";
import { RefObject, useEffect } from "react";
import {
  lpvDiagramCheckboxDisabledHandler, lpvDiagramCheckboxCheckedHandler
} from "@/handlers/diagramCheckboxHandlers";

export const useLpvBoardButtonClicks = (checkboxRef: RefObject<HTMLInputElement>, lpvRef: RefObject<any>) => { // TODO fix any
  const [gameState] = useAtom(gameAtom)
  const { diagrams } = gameState

  useEffect(() => {
    const boardButtons = document.querySelector(".lpv__controls")

    if (!boardButtons) return

    // TODO can this me made more efficient? Merge with MoveClicks?
    boardButtons?.addEventListener('click', () => {
      let moves = [...document.querySelectorAll('move')].filter(m => m.parentNode?.querySelector('variation') && m.className !== 'empty')
      let ply = moves.findIndex(m => m.classList.contains('current')) + 1
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