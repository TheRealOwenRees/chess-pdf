import { DiagramProps, GameAction, GameProps } from "@/types";
import { Dispatch, RefObject } from "react";

export const lpvDiagramCheckboxDisabledHandler = (checkboxRef: RefObject<HTMLInputElement>, ply: number) => {
  if (checkboxRef.current) {
    ply < 1 ? checkboxRef.current.disabled = true : checkboxRef.current.disabled = false
  }
}

export const lpvDiagramCheckboxCheckedHandler = (diagrams: DiagramProps[], checkboxRef: RefObject<HTMLInputElement>, ply: number) => {
  if (checkboxRef.current) {
    checkboxRef.current.checked = diagrams.some(d => d.ply === ply);
  }
}

export const lpvDiagramCheckboxHandler = (
  gameState: GameProps,
  gameDispatch: Dispatch<GameAction>,
  checkboxRef: RefObject<HTMLInputElement>,
  lpvRef: RefObject<any> // TODO fix any
) => {
  // TODO these 3 lines also appear in diagramCheckboxHandlers.ts - make it DRY
  let moves = [...document.querySelectorAll('move')].filter(m => m.parentNode?.querySelector('variation') && m.className !== 'empty')
  let ply = moves.findIndex(m => m.classList.contains('current')) + 1
  let fen = lpvRef.current?.curData().fen

  if (checkboxRef.current?.checked && ply > 0) {
      gameDispatch({ type: 'ADD_DIAGRAM', payload: { ply, fen } })
    }

    if (!checkboxRef.current?.checked && ply > 0) {
      gameDispatch({ type: 'DELETE_DIAGRAM', payload: { ply } })
    }
}