"use client";

import { GameProps } from "@/types";
import { MutableRefObject } from "react";
import { diagramCheckboxHandler } from "@/handlers/diagramCheckboxHandlers";

const DiagramCheckbox = ({ checkboxRef, gameState, gameDispatch }: {
  checkboxRef: MutableRefObject<HTMLInputElement | null>,
  gameState: GameProps,
  gameDispatch: any
}) => {

  return (
    <div className="flex justify-start mt-4">
      <label htmlFor="diagramCheckbox">Select Diagram</label>
      <input type="checkbox"
             className="ml-2 accent-primary-200"
             id="diagramCheckbox"
             disabled
             ref={checkboxRef}
             onChange={() => diagramCheckboxHandler(
               gameState,
               gameDispatch,
               checkboxRef)}
      />
    </div>
  );
};

export default DiagramCheckbox;