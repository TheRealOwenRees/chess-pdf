// TODO split into smaller components
"use client";

import { useEffect, useState } from "react";

import { useAtom, useAtomValue } from "jotai";
import { toast } from "react-toastify";

import LichessLogo from "@/app/components/LichessLogo";
import { gameAtom, lichessUserAtom } from "@/atoms";
import {
  handleClearGame,
  handleImportPGNFromLichess,
  handleLoadPGN,
} from "@/handlers/pgnHandlers";
import useLichessOAuth from "@/hooks/useLichessOAuth";
import { IChapter } from "@/types";

// TODO split into smaller components

// TODO split into smaller components

// TODO split into smaller components

// TODO split into smaller components

// TODO split into smaller components

interface IStudy {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const GameLoadButtons = () => {
  const [_, gameDispatch] = useAtom(gameAtom); // TODO move to handler? First change handlers to hooks
  const {
    lichessLogin,
    lichessLogout,
    lichessGetUserStudies,
    lichessAllChapters,
  } = useLichessOAuth();
  const [userStudies, setUserStudies] = useState<IStudy[] | undefined>([]);
  const [studyChapters, setStudyChapters] = useState<IChapter[] | undefined>(
    [],
  );

  const lichessUser = useAtomValue(lichessUserAtom);

  // load user studies on login
  useEffect(() => {
    if (lichessUser.username && lichessUser.loggedIn) {
      (async () => {
        const studies = await lichessGetUserStudies();
        setUserStudies(studies);
      })();
    }
  }, [lichessUser]);

  // load chapters on study selection
  const handleStudySelection = async (studyId: string) => {
    const response = await lichessAllChapters(studyId);
    setStudyChapters(response);
    toast.success("Study loaded");
  };

  const lichessLoginLogoutButton = lichessUser.loggedIn ? (
    <button
      className="group btn btn-outline btn-primary hover:btn-primary"
      onClick={async () => {
        await lichessLogout();
        setUserStudies([]);
        setStudyChapters([]);
      }}
    >
      <LichessLogo className="h-5 w-5 fill-primary stroke-primary group-hover:fill-white group-hover:stroke-white" />
      Logout {lichessUser.username}
    </button>
  ) : (
    <button
      className="group btn btn-outline btn-primary hover:btn-primary"
      onClick={lichessLogin}
    >
      <LichessLogo className="h-5 w-5 fill-primary stroke-primary group-hover:fill-white group-hover:stroke-white" />
      Log into Lichess.org
    </button>
  );

  const lichessImportButton = lichessUser.loggedIn && userStudies && (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="group btn btn-outline btn-primary hover:btn-primary"
      >
        Import Lichess Study
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-10 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        {userStudies.map((study) => (
          <li key={study.id}>
            <div onClick={() => handleStudySelection(study.id)}>
              {study.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  // TODO get game name from PGN and use as chapter name
  const chapterSelectionButton = lichessUser.loggedIn &&
    studyChapters &&
    studyChapters.length > 0 && (
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="group btn btn-outline btn-primary hover:btn-primary"
        >
          Select Chapter/Game
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-10 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          {studyChapters.map((chapter, index) => (
            <li key={chapter.chapterId}>
              <div
                onClick={() =>
                  handleImportPGNFromLichess(chapter, gameDispatch)
                }
              >
                {index + 1}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="flex w-full flex-col justify-between gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {lichessLoginLogoutButton}
        {lichessImportButton}
        {chapterSelectionButton}
      </div>
      <p className="text-center">OR</p>
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-4">
        <input
          type="file"
          id="fileInput"
          className="file-input file-input-bordered file-input-primary file-input-md max-w-xs"
          onChange={(e) => handleLoadPGN(e, gameDispatch)}
        />
        <button
          className="btn btn-primary w-full md:w-1/4"
          onClick={(e) => handleClearGame(e, gameDispatch)}
        >
          Clear Game
        </button>
      </div>
    </div>
  );
};

export default GameLoadButtons;
