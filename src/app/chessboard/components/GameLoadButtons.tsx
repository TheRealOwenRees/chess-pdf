"use client";

import { useEffect, useState } from "react";

import { useAtomValue } from "jotai";
import { toast } from "react-toastify";

import DropdownButton from "@/app/chessboard/components/DropdownButton";
import LichessButton from "@/app/chessboard/components/LichessButton";
import { lichessUserAtom } from "@/atoms";
import useLichessOAuth from "@/hooks/useLichessOAuth";
import usePgn from "@/hooks/usePgn";
import { IChapter } from "@/types";

interface IStudy {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const GameLoadButtons = () => {
  const lichessUser = useAtomValue(lichessUserAtom);
  const { clearPgn, importPgnFromLichess, loadPgn } = usePgn();
  const [userStudies, setUserStudies] = useState<IStudy[] | undefined>([]);
  const [studyChapters, setStudyChapters] = useState<IChapter[]>([]);

  const {
    lichessLogin,
    lichessLogout,
    lichessGetUserStudies,
    lichessAllChapters,
  } = useLichessOAuth();

  // load user studies on login
  useEffect(() => {
    if (lichessUser.username && lichessUser.loggedIn) {
      (async () => {
        const studies = await lichessGetUserStudies();
        setUserStudies(studies);
      })();
    }
  }, [lichessUser]);

  const handleDropdownClick = () => {
    const elem = document.activeElement;
    if (elem && elem instanceof HTMLElement) {
      elem.blur();
    }
  };

  // load chapters on study selection
  const handleStudySelection = async (studyId: string) => {
    const response = await lichessAllChapters(studyId);

    if ("error" in response) {
      setStudyChapters([]);
      toast.error("This study does not allow exporting of it's games!");
      return;
    }

    clearPgn();
    setStudyChapters(response);
    toast.success(`Study loaded`);
  };

  const lichessLoginLogoutButton = lichessUser.loggedIn ? (
    <LichessButton
      label={`Logout ${lichessUser.username}`}
      onClickHandler={async () => {
        await lichessLogout();
        setUserStudies([]);
        setStudyChapters([]);
      }}
    />
  ) : (
    <LichessButton label="Log into Lichess.org" onClickHandler={lichessLogin} />
  );

  const lichessImportButton = lichessUser.loggedIn && userStudies && (
    <DropdownButton>
      {userStudies.map((study) => (
        <li key={study.id} onClick={handleDropdownClick}>
          <div onClick={() => handleStudySelection(study.id)}>{study.name}</div>
        </li>
      ))}
    </DropdownButton>
  );

  const chapterSelectionButton = lichessUser.loggedIn &&
    studyChapters &&
    studyChapters.length > 0 && (
      <DropdownButton>
        {studyChapters.map((chapter) => (
          <li key={chapter.chapterId} onClick={handleDropdownClick}>
            <div onClick={() => importPgnFromLichess(chapter)}>
              {chapter.name}
            </div>
          </li>
        ))}
      </DropdownButton>
    );

  return (
    <div className="flex w-full flex-col justify-between gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {lichessLoginLogoutButton}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        {lichessImportButton}
        {chapterSelectionButton}
      </div>
      <p className="text-center">OR</p>
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-4">
        <input
          type="file"
          id="fileInput"
          className="file-input file-input-bordered file-input-primary file-input-md max-w-xs"
          onChange={loadPgn}
        />
        <button className="btn btn-primary w-full md:w-1/4" onClick={clearPgn}>
          Clear Game
        </button>
      </div>
    </div>
  );
};

export default GameLoadButtons;
