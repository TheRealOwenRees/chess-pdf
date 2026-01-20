"use client";

import { MutableRefObject } from "react";

import { useAtom } from "jotai";

import { gameAtom } from "@/atoms";
import { lpvDiagramCheckboxHandler } from "@/handlers/diagramCheckboxHandlers";

const DiagramCheckbox = ({
  checkboxRef,
  lpvRef,
}: {
  checkboxRef: MutableRefObject<HTMLInputElement | null>;
  lpvRef: MutableRefObject<any>;
}) => {
  const [_, gameDispatch] = useAtom(gameAtom);

  return (
    <label className="label cursor-pointer">
      <span className="label-text">Select Diagram</span>
      <input
        type="checkbox"
        className="checkbox-primary checkbox ml-2"
        id="diagramCheckbox"
        disabled
        ref={checkboxRef}
        onChange={() =>
          lpvDiagramCheckboxHandler(gameDispatch, checkboxRef, lpvRef)
        }
      />
    </label>
  );
};

export default DiagramCheckbox;
