import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";
import { gameReducer, initialGameState } from "@/reducers/gameReducer";

// game context - pgn / headers / diagrams
export const gameAtom = atomWithReducer(initialGameState, gameReducer);

export const lichessUserAtom = atom({
  username: "",
  loggedIn: false,
})
