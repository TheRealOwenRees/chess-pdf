'use client'

import dynamic from "next/dynamic";
import {useMemo, useRef, useState} from "react";

import SectionLargeHeading from "@/app/components/SectionLargeHeading";
import HeaderFields from "@/app/chessboard/HeaderFields";
import GameLoadButtons from "@/app/chessboard/GameLoadButtons";
import LoadingBoard from "@/app/chessboard/LoadingBoard";
import Alert from "@/app/components/Alert";

import {useGameContext} from "@/context/GameContext";
import {diagramCheckboxHandler} from "@/handlers/diagramCheckboxHandlers";
import useBoardButtonClicks from "@/hooks/useBoardButtonClicks";
import useMoveListClicks from "@/hooks/useMoveListClicks";
import GameSaveButtons from "@/app/chessboard/GameSaveButtons";

const GameBoard = dynamic(() => import("./Board"), {
    ssr: false,
    loading: LoadingBoard
})

const Chessboard = () => {
    const {gameState, gameDispatch} = useGameContext()
    const {diagrams, pgn} = gameState
    const checkboxRef = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState({
        type: '',
        message: ''
    })

    useBoardButtonClicks(checkboxRef)
    useMoveListClicks(checkboxRef)

    const diagramCheckbox = () => {
        return (
            <div className="flex justify-start mt-4">
                <label htmlFor="diagramCheckbox">Select Diagram</label>
                <input type="checkbox"
                       className="ml-2 accent-primary-200"
                       id="diagramCheckbox"
                       disabled
                       ref={checkboxRef}
                       onChange={() => diagramCheckboxHandler(
                           gameState,
                           gameDispatch,
                           checkboxRef)}
                />
            </div>
        )
    }

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
                {diagramCheckbox()}
                <Alert type={message.type} message={message.message} setMessage={setMessage} />
                <GameSaveButtons setMessage={setMessage}/>
                <HeaderFields/>
            </main>
        </>
    )
}

export default Chessboard