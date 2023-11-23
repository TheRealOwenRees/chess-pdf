'use client'

import { BoardProps } from "@/types";
import { useLayoutEffect } from "react";
import { pgnView } from "@mliebelt/pgn-viewer";


const Board = (props: BoardProps) => {
  const pgn = props.children
  const id = "board"

  useLayoutEffect(() => {
    pgnView(id, {
      pgn: pgn,
      pieceStyle: "wikipedia",
      locale: "en",
      boardSize: "300",
      resizable: false,
      layout: "top",
      showResult: true,
      showFen: true,
    })
  })

  return <div id={id} data-test="board"></div>
}

export default Board