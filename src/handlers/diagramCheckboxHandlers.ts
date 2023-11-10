import { DiagramProps, GameAction, GameProps } from "@/types";
import { Dispatch, RefObject } from "react";

// Handle clicking of checkbox under the chess board
// TODO write tests for this
export const diagramCheckboxHandler = (
    gameState: GameProps,
    gameDispatch: Dispatch<GameAction>,
    checkboxRef: RefObject<HTMLInputElement>) => {

  if (gameState.pgn) {
    // @ts-ignore
    let sans = [...document.querySelectorAll('san')].filter(s => s.parentNode?.parentNode?.className !== "variation");
    let ply = sans.findIndex(s => s.className === "yellow") + 1
    const boardFen = document.getElementById("boardFen") as HTMLInputElement
    let fen = boardFen.value

    if (checkboxRef.current?.checked && ply > 0) {
      gameDispatch({ type: 'ADD_DIAGRAM', payload: { ply, fen } })
    }

    if (!checkboxRef.current?.checked && ply > 0) {
      gameDispatch({ type: 'DELETE_DIAGRAM', payload: { ply } })
    }
  }
}

// Disable checkbox if no move or variation is selected
// TODO write tests for this
export const diagramCheckboxDisabledHandler = (checkboxRef: RefObject<HTMLInputElement>) => {
  // @ts-ignore
  let sans = [...document.querySelectorAll('san')].filter(s => s.parentNode?.parentNode?.className !== "variation");
  let ply = sans.findIndex(s => s.className === "yellow") + 1

  if (checkboxRef.current) {
    ply < 1 ? checkboxRef.current.disabled = true : checkboxRef.current.disabled = false
  }
}

// Check / uncheck checkbox if diagram is already in list
// TODO write tests for this
export const diagramCheckboxCheckedHandler = (diagrams: DiagramProps[], checkboxRef: RefObject<HTMLInputElement>) => {
  // @ts-ignore
  let sans = [...document.querySelectorAll('san')].filter(s => s.parentNode?.parentNode?.className !== "variation");
  let ply = sans.findIndex(s => s.className === "yellow") + 1

  if (checkboxRef.current) {
    checkboxRef.current.checked = diagrams.some(d => d.ply === ply);
  }
}