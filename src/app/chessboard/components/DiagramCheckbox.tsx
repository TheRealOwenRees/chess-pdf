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
    <div className="flex justify-start mt-4">
      <label htmlFor="diagramCheckbox">Select Diagram</label>
      <input type="checkbox"
             className="ml-2 accent-primary-200"
             id="diagramCheckbox"
             disabled
             ref={checkboxRef}
             onChange={() => lpvDiagramCheckboxHandler(
               gameState,
               gameDispatch,
               checkboxRef,
               lpvRef)}
      />
    </div>
  );
};

export default DiagramCheckbox;