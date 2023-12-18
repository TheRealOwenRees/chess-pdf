import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";
import { gameReducer, initialGameState } from "@/reducers/gameReducer";

// game context - pgn / headers / diagrams
export const gameAtom = atomWithReducer(initialGameState, gameReducer);

// messages - success / errors
export const messageAtom = atom(
  {
    type: "",
    message: "",
    isSending: false,
    isSuccess: false
  });
