"use client";

import { GameProps } from "@/types";

import { useAtom, useAtomValue } from "jotai";
import { gameAtom, messageAtom } from "@/atoms";

import { MutableRefObject } from "react";
import { lpvDiagramCheckboxHandler } from "@/handlers/diagramCheckboxHandlers";

const DiagramCheckbox = ({ checkboxRef, lpvRef }: {
  checkboxRef: MutableRefObject<HTMLInputElement | null>,
  lpvRef: MutableRefObject<any>
}) => {

  const [_, gameDispatch] = useAtom(gameAtom)

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