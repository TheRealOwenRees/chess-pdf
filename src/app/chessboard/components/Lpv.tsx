import { useEffect, useLayoutEffect } from "react";
import LichessPgnViewer from "lichess-pgn-viewer";
import { useGameContext } from "@/context/GameContext";

const Lpv = () => {
  const { gameState } = useGameContext()
  let { pgn } = gameState
  const id = "lpv-board"

  useEffect(() => {
    const element: HTMLElement | null = document.querySelector('.lpv-board')

    if (!element) return

    LichessPgnViewer(element, {
      pgn: pgn,
    })
  }, [pgn]);

  return (
      <div className={id} data-test="lpv-board"></div>
    )
}

export default Lpv