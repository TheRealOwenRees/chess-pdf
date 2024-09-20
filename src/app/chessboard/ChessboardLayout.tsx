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
import useToast from "@/hooks/useToast";

const ChessboardLayout = () => {
    const message = useAtomValue(messageAtom)
    const checkboxRef = useRef<HTMLInputElement>(null)
    const lpvRef = useRef()

    useLpvBoardButtonClicks(checkboxRef, lpvRef)
    useToast(message, 'chessboard')

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
                <HeaderFields />
            </main>
        </>
    )
}

export default ChessboardLayout
