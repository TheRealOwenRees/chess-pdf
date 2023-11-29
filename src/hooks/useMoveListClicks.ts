import { useAtom } from "jotai/index";
import { gameAtom } from "@/atoms";
import { RefObject, useEffect } from "react";
import { lpvDiagramCheckboxCheckedHandler, lpvDiagramCheckboxDisabledHandler } from "@/handlers/diagramCheckboxHandlers";

// TODO write tests for this hook
// TODO combine with useBoardButtonClicks
export const useLpvMoveListClicks = (checkboxRef: RefObject<HTMLInputElement>) => {
  const [gameState] = useAtom(gameAtom)
  const { diagrams } = gameState

  useEffect(() => {
    const movesList = document.querySelector(".lpv__moves")

    if (!movesList) return

    movesList.addEventListener('click', () => {
      setTimeout(() => {
        let moves = [...document.querySelectorAll('move')].filter(m => m.parentNode?.querySelector('variation') && m.className !== 'empty')
        let ply = moves.findIndex(m => m.classList.contains('current')) + 1
        lpvDiagramCheckboxDisabledHandler(checkboxRef, ply)
        lpvDiagramCheckboxCheckedHandler(diagrams, checkboxRef, ply)
      }, 250)
    })

    return () => {
      movesList.removeEventListener('click', () => {
        console.log('lpv move list clicked')
      })
    }
  })
}