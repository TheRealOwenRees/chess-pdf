'use client'

import { useRef, useState } from "react";

import Lpv from "@/app/chessboard/components/Lpv";
import SectionLargeHeading from "@/app/components/SectionLargeHeading";
import HeaderFields from "@/app/chessboard/components/HeaderFields";
import GameLoadButtons from "@/app/chessboard/components/GameLoadButtons";
import GameSaveButtons from "@/app/chessboard/components/GameSaveButtons";
import Alert from "@/app/components/Alert";
import DiagramCheckbox from "@/app/chessboard/components/DiagramCheckbox";

import { useGameContext } from "@/context/GameContext";
import { useLpvBoardButtonClicks } from "@/hooks/useBoardButtonClicks";
import { useLpvMoveListClicks } from "@/hooks/useMoveListClicks";

import { useAtom } from "jotai";
import { gameAtom } from "@/atoms";

const ChessboardLayout = () => {
    // const { gameState, gameDispatch } = useGameContext()
    const checkboxRef = useRef<HTMLInputElement>(null) // TODO move to atom
    const lpvRef = useRef() // TODO move to atom?
    const [message, setMessage] = useState({
        type: '',
        message: ''
    })

    useLpvBoardButtonClicks(checkboxRef, lpvRef)
    useLpvMoveListClicks(checkboxRef)

    const [gameState, gameDispatch] = useAtom(gameAtom)
    console.log(gameState)

    return (
        <>
            <main className="grid max-w-screen-2xl items-center px-8">
                <SectionLargeHeading text="Convert PGN to " textAccent="PDF"/>
                <GameLoadButtons/>
                <div className="">
                    <Lpv ref={lpvRef} />
                </div>
                <DiagramCheckbox checkboxRef={checkboxRef} gameState={gameState} gameDispatch={gameDispatch} lpvRef={lpvRef} />
                <GameSaveButtons setMessage={setMessage}/>
                <Alert type={message.type} message={message.message} setMessage={setMessage} />
                <HeaderFields />
            </main>
        </>
    )
}

export default ChessboardLayout