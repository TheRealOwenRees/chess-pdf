"use client"

import { useAtom, useAtomValue } from "jotai";
import { gameAtom, lichessUserAtom } from "@/atoms";

import { handleClearGame, handleLoadPGN } from "@/handlers/pgnHandlers";
import LichessLogo from "@/app/components/LichessLogo";

import useLichessOAuth from "@/hooks/useLichessOAuth";
import { useEffect, useState } from "react";

interface IStudy {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

interface IChapter {
  chapterId: string
  pgn: string
}

const GameLoadButtons = () => {
  const [_, gameDispatch] = useAtom(gameAtom)
  const { lichessLogin, lichessLogout, lichessGetUserStudies, lichessAllChapters } = useLichessOAuth()
  const [userStudies, setUserStudies] = useState<IStudy[] | undefined>([])
  const [studyChapters, setStudyChapters] = useState<IChapter[] | undefined>([])

  // TODO copy eslint / prettier config from asd-penpal project
  // TODO add a 'Select Chapter/Game' button to select a game to import

  const lichessUser = useAtomValue(lichessUserAtom)

  console.log('user:', lichessUser)
  console.log('user studies:', userStudies)
  console.log('study chapters:', studyChapters)

  useEffect(() => {
    if (lichessUser.username && lichessUser.loggedIn) {
      (async () => {
        const studies = await lichessGetUserStudies()
        setUserStudies(studies)
      })()
    }
  }, [lichessUser]);

  const handleStudySelection = async (studyId: string) => {
    const response = await lichessAllChapters(studyId)
    setStudyChapters(response)
  }

  const lichessLoginLogoutButton = lichessUser.loggedIn ? (
    <button className="btn btn-outline btn-primary hover:btn-primary group" onClick={async () => {
      await lichessLogout()
      setUserStudies([])
      setStudyChapters([])
    }}>
      <LichessLogo className="w-5 h-5 fill-primary stroke-primary group-hover:fill-white group-hover:stroke-white" />
      Logout {lichessUser.username}
    </button>
  ) : (
    <button className="btn btn-outline btn-primary hover:btn-primary group" onClick={lichessLogin}>
      <LichessLogo className="w-5 h-5 fill-primary stroke-primary group-hover:fill-white group-hover:stroke-white" />
      Log into Lichess.org
    </button>
  )

  const lichessImportButton = lichessUser.loggedIn && userStudies && (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-outline btn-primary hover:btn-primary group">
        Import Lichess Study
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow">
        {userStudies.map((study) => (
          <li key={study.id}><div onClick={() => handleStudySelection(study.id)}>{study.name}</div></li>
        ))}
      </ul>
    </div>
  )

  const chapterSelectionButton = lichessUser.loggedIn && studyChapters && studyChapters.length > 0 && (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-outline btn-primary hover:btn-primary group">
        Select Chapter/Game
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow">
        {studyChapters.map((chapter, index) => (
          <li key={chapter.chapterId}>
            <div onClick={() => console.log(chapter.chapterId)}>{index + 1}</div>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="flex flex-col w-full justify-between gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {lichessLoginLogoutButton}
        {lichessImportButton}
        {chapterSelectionButton}
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
