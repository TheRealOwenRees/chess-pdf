"use client";

import { GameProps } from "@/types";
import { MutableRefObject } from "react";
import { lpvDiagramCheckboxHandler } from "@/handlers/diagramCheckboxHandlers";

const DiagramCheckbox = ({ checkboxRef, gameState, gameDispatch, lpvRef }: {
  checkboxRef: MutableRefObject<HTMLInputElement | null>,
  gameState: GameProps,
  gameDispatch: any,
  lpvRef: MutableRefObject<any>
}) => {

  return (
    <label className="label cursor-pointer">
      <span className="label-text">Select Diagram</span>
      <input type="checkbox"
             className="checkbox checkbox-primary ml-2"
             id="diagramCheckbox"
             disabled
             ref={checkboxRef}
             onChange={() => lpvDiagramCheckboxHandler(
                gameDispatch,
                checkboxRef,
                lpvRef)}
      />
    </label>
  );
};

export default DiagramCheckbox;