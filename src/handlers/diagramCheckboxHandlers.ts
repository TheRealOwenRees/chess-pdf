import { Dispatch, RefObject } from "react";

import { DiagramProps, GameAction } from "@/types";

export const lpvDiagramCheckboxDisabledHandler = (
  checkboxRef: RefObject<HTMLInputElement>,
  ply: number,
) => {
  if (checkboxRef.current) {
    ply < 1
      ? (checkboxRef.current.disabled = true)
      : (checkboxRef.current.disabled = false);
  }
};

export const lpvDiagramCheckboxCheckedHandler = (
  diagrams: DiagramProps[],
  checkboxRef: RefObject<HTMLInputElement>,
  ply: number,
) => {
  if (checkboxRef.current) {
    checkboxRef.current.checked = diagrams.some((d) => d.ply === ply);
  }
};

export const lpvDiagramCheckboxHandler = (
  gameDispatch: Dispatch<GameAction>,
  checkboxRef: RefObject<HTMLInputElement>,
  lpvRef: RefObject<any>,
) => {
  const variationTags = document.querySelector("variation");
  const moves = [...document.querySelectorAll("move")].filter((m) => {
    if (!variationTags) return m.className !== "empty";
    return m.parentNode?.querySelector("variation") && m.className !== "empty";
  });

  let ply = moves.findIndex((m) => m.classList.contains("current")) + 1;
  let fen = lpvRef.current?.curData().fen;

  if (checkboxRef.current?.checked && ply > 0) {
    gameDispatch({ type: "ADD_DIAGRAM", payload: { ply, fen } });
  }

  if (!checkboxRef.current?.checked && ply > 0) {
    gameDispatch({ type: "DELETE_DIAGRAM", payload: { ply } });
  }
};

export const lpvDiagramClockToggleHandler = (
  gameDispatch: Dispatch<GameAction>,
  toggleRef: RefObject<HTMLInputElement>,
) => {
  if (toggleRef.current?.checked) {
    gameDispatch({ type: "TOGGLE_DIAGRAM_CLOCK", payload: true });
  }

  if (!toggleRef.current?.checked) {
    gameDispatch({ type: "TOGGLE_DIAGRAM_CLOCK", payload: false });
  }
};
