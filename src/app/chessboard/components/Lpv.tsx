import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import LichessPgnViewer from "lichess-pgn-viewer";
import { useGameContext } from "@/context/GameContext";
import PgnViewer from "lichess-pgn-viewer/pgnViewer";

const Lpv = forwardRef((props, ref) => {
  const { gameState } = useGameContext();
  let { pgn } = gameState;
  const id = "lpv-board";
  const viewer = useRef<PgnViewer | null>(null);

  useEffect(() => {
    const element: HTMLElement | null = document.querySelector('.lpv-board');

    if (!element) return;

    viewer.current = LichessPgnViewer(element, {
      pgn: pgn,
      scrollToMove: false,
    });

  }, [pgn]);

  // Forward the ref to the parent component
  useImperativeHandle(ref, () => ({
    curData: () => {
      if (!viewer.current) return null;
      return viewer.current.curData();
    },
  }), []);

  return (
    <div className={id} data-test="lpv-board"></div>
  );
});

export default Lpv;
