'use client'

import { useAtomValue } from "jotai";
import { messageAtom } from "@/atoms";

import { useRef } from "react";

import Lpv from "@/app/chessboard/components/Lpv";
import HeaderFields from "@/app/chessboard/components/HeaderFields";
import DiagramCheckbox from "@/app/chessboard/components/DiagramCheckbox";
import DiagramClockToggle from "@/app/chessboard/components/DiagramClockToggle";
import SectionLargeHeading from "@/app/components/SectionLargeHeading";
import GameLoadButtons from "@/app/chessboard/components/GameLoadButtons";
import GameSaveButtons from "@/app/chessboard/components/GameSaveButtons";

import { useLpvBoardButtonClicks } from "@/hooks/useBoardClicks";
import AlertError from "@/app/components/AlertError";
import AlertSuccess from "@/app/components/AlertSuccess";

const ChessboardLayout = () => {
    const message = useAtomValue(messageAtom)

    const checkboxRef = useRef<HTMLInputElement>(null) // TODO move to atom
    const lpvRef = useRef() // TODO move to atom?

    useLpvBoardButtonClicks(checkboxRef)

    const renderAlert = () => {
        if (message?.type === 'success' && message.message) {
            return <AlertSuccess />
        } else if (message?.type === 'error' && message.message){
            return <AlertError />
        }
    }

    return (
        <>
            <main className="grid max-w-screen-2xl items-center px-8">
                <SectionLargeHeading text="Convert PGN to " textAccent="PDF"/>
                <GameLoadButtons/>
                <div className="">
                    <Lpv ref={lpvRef} />
                </div>
                <div className="flex justify-between">
                    <DiagramCheckbox checkboxRef={checkboxRef} lpvRef={lpvRef} />
                    <DiagramClockToggle />
                </div>
                <GameSaveButtons />
                {renderAlert()}
                <HeaderFields />
            </main>
        </>
    )
}

export default ChessboardLayout