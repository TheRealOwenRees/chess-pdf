'use client'

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";

import SectionLargeHeading from "@/app/components/SectionLargeHeading";
import HeaderFields from "@/app/chessboard/components/HeaderFields";
import GameLoadButtons from "@/app/chessboard/components/GameLoadButtons";
import LoadingBoard from "@/app/chessboard/components/LoadingBoard";
import Alert from "@/app/components/Alert";
import DiagramCheckbox from "@/app/chessboard/components/DiagramCheckbox";

import { useGameContext } from "@/context/GameContext";
import useBoardButtonClicks from "@/hooks/useBoardButtonClicks";
import useMoveListClicks from "@/hooks/useMoveListClicks";
import GameSaveButtons from "@/app/chessboard/components/GameSaveButtons";

// TODO does this need to be dynamic?
const GameBoard = dynamic(() => import("./components/Board"), {
    ssr: false,
    loading: LoadingBoard
})

const ChessboardLayout = () => {
    const { gameState, gameDispatch } = useGameContext()
    const { diagrams, pgn} = gameState
    const checkboxRef = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState({
        type: '',
        message: ''
    })

    useBoardButtonClicks(checkboxRef)
    useMoveListClicks(checkboxRef)

    // memoized chessboard that only re-renders with gamePGN state change
    const chessBoardMemoized = useMemo(() => {
        return <GameBoard diagrams={diagrams}>{pgn}</GameBoard>
    }, [pgn])

    return (
        <>
            <main className="grid max-w-screen-2xl items-center px-8">
                <SectionLargeHeading text="Convert PGN to" textAccent="PDF"/>
                <GameLoadButtons/>
                <div className="flex justify-center">
                    {chessBoardMemoized}
                </div>
                <DiagramCheckbox checkboxRef={checkboxRef} gameState={gameState} gameDispatch={gameDispatch} />
                <GameSaveButtons setMessage={setMessage}/>
                <Alert type={message.type} message={message.message} setMessage={setMessage} />
                <HeaderFields/>
            </main>
        </>
    )
}

export default ChessboardLayout