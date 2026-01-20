"use client";

import { useRef } from "react";

import { useAtom } from "jotai";

import { gameAtom } from "@/atoms";
import { lpvDiagramClockToggleHandler } from "@/handlers/diagramCheckboxHandlers";

const DiagramClockToggle = () => {
  const [gameState, gameDispatch] = useAtom(gameAtom);
  const toggleRef = useRef<HTMLInputElement>(null);

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">Render move times</span>
        <input
          type="checkbox"
          className="toggle toggle-primary ml-2"
          onChange={() => lpvDiagramClockToggleHandler(gameDispatch, toggleRef)}
          ref={toggleRef}
        />
      </label>
    </div>
  );
};

export default DiagramClockToggle;
