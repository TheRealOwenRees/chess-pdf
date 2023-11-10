'use client'

import { GameProps } from "@/types";

import { createContext, ReactNode, useContext, useReducer } from "react";
import { gameReducer, initialGameState } from "@/reducers/gameReducer";

const GameContext = createContext({
  gameState: initialGameState as GameProps,
  gameDispatch: (action: any) => {}
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children } : { children : ReactNode }) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState)

  return (
    <GameContext.Provider value={{gameState, gameDispatch}}>
      {children}
    </GameContext.Provider>
  );
};