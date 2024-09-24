"use client"

import { useAtom, useAtomValue } from "jotai";
import { gameAtom, lichessUserAtom } from "@/atoms";

import { handleClearGame, handleLoadPGN } from "@/handlers/pgnHandlers";
import LichessLogo from "@/app/components/LichessLogo";

import useLichessOAuth from "@/hooks/useLichessOAuth";
import { useState } from "react";

interface study {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

const GameLoadButtons = () => {
  const [_, gameDispatch] = useAtom(gameAtom)
  const { lichessLogin, lichessLogout, lichessGetUserStudies } = useLichessOAuth()
  const [userStudies, setUserStudies] = useState<study[]>()

  console.log(userStudies)

  const lichessUser = useAtomValue(lichessUserAtom)

  const handleImportLichessStudy = async () => {
    const studies = await lichessGetUserStudies()
    setUserStudies(studies)
  }

  const selectStudyButton = userStudies && (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">Click</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          {userStudies.map((study) => (
            <li key={study.id}><a>{study.name}</a></li>
            ))}
        </ul>
    </div>
  )

  const lichessLoginLogoutButton = lichessUser.loggedIn ? (
    <button className="btn btn-outline btn-primary hover:btn-primary group" onClick={lichessLogout}>
      <LichessLogo className="w-5 h-5 fill-primary stroke-primary group-hover:fill-white group-hover:stroke-white" />
      Logout {lichessUser.username}
    </button>
  ) : (
    <button className="btn btn-outline btn-primary hover:btn-primary group" onClick={lichessLogin}>
      <LichessLogo className="w-5 h-5 fill-primary stroke-primary group-hover:fill-white group-hover:stroke-white" />
      Log into Lichess.org
    </button>
  )

  const lichessImportButton = lichessUser.loggedIn && (
    <button className="btn btn-outline btn-primary hover:btn-primary group" onClick={handleImportLichessStudy}>
      Import Lichess Study
    </button>
  )

  return (
    <div className="flex flex-col w-full justify-between gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {lichessLoginLogoutButton}
        {lichessImportButton}
        {userStudies && userStudies.length > 0 && selectStudyButton}
      </div>
      <p className="text-center">OR</p>
      <div className="flex items-center flex-wrap justify-between w-full mb-4 gap-4">
        <input
          type="file"
          id="fileInput"
          className="file-input file-input-md file-input-bordered file-input-primary max-w-xs"
          onChange={(e) => handleLoadPGN(e, gameDispatch)}
        />
        <button className="btn btn-primary w-full md:w-1/4"
                onClick={(e) => handleClearGame(e, gameDispatch)}>
          Clear Game
        </button>
      </div>
    </div>
  )
}

export default GameLoadButtons
