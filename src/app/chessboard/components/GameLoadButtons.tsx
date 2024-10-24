"use client";

import { FormEvent, useRef, useState } from "react";

import { useAtomValue } from "jotai";
import { toast } from "react-toastify";

import DropdownButton from "@/app/chessboard/components/DropdownButton";
import LichessButton from "@/app/chessboard/components/LichessButton";
import ClearInputIcon from "@/app/components/ClearInputIcon";
import SearchIcon from "@/app/components/SearchIcon";
import { lichessUserAtom } from "@/atoms";
import useLichessOAuth from "@/hooks/useLichessOAuth";
import useLichessStudy from "@/hooks/useLichessStudy";
import usePgn from "@/hooks/usePgn";

const GameLoadButtons = () => {
  const studyUrlRef = useRef<HTMLInputElement>(null);
  const lichessUser = useAtomValue(lichessUserAtom);
  const { clearPgn, loadPgn } = usePgn();
  const { lichessLogin, lichessLogout } = useLichessOAuth();
  const [isImportingLink, setIsImportingLink] = useState(false);
  const [isImportingStudy, setIsImportingStudy] = useState(false);

  const {
    importPgn,
    importStudyFromUrl,
    userStudies,
    setUserStudies,
    filteredUserStudies,
    studyChapters,
    setStudyChapters,
    studySearchTerm,
    clearStudySearch,
    studySearch,
    studySelection,
  } = useLichessStudy();

  const handleDropdownClick = () => {
    const elem = document.activeElement;
    if (elem && elem instanceof HTMLElement) {
      elem.blur();
    }
  };

  const handleStudyLinkSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsImportingLink(true);
    try {
      await importStudyFromUrl(e);
    } catch (error) {
      toast.error("Error importing study", {
        toastId: "lichess-import-error",
      });
    } finally {
      setIsImportingLink(false);
    }
  };

  const handleStudyImportButtonSubmit = async (studyId: string) => {
    setIsImportingStudy(true);

    try {
      await studySelection(studyId);
    } catch (error) {
      toast.error("Error importing study", {
        toastId: "lichess-import-error",
      });
    } finally {
      setIsImportingStudy(false);
    }
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

  const lichessStudyLinkInput = lichessUser.loggedIn && (
    <form className="relative flex gap-1" onSubmit={handleStudyLinkSubmit}>
      <div className="relative">
        <input
          type="text"
          placeholder="Enter Lichess Study URL"
          className="input input-bordered w-full max-w-xs pr-10"
          name="lichessStudyUrl"
          ref={studyUrlRef}
        />
        <ClearInputIcon
          onClick={() => (studyUrlRef.current!.value = "")}
          className="right-0"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary px-5"
        disabled={isImportingLink}
      >
        {isImportingLink ? "Importing..." : "Import Study"}
      </button>
    </form>
  );

  const lichessImportButton = lichessUser.loggedIn && userStudies && (
    <DropdownButton
      label={isImportingStudy ? "Importing..." : "Select Lichess Study"}
      loading={isImportingStudy}
    >
      <div className="relative">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full max-w-xs pl-8 text-sm"
          onChange={studySearch}
          value={studySearchTerm}
        />
        <ClearInputIcon onClick={clearStudySearch} />
        {filteredUserStudies?.map((study) => (
          <li key={study.id} onClick={handleDropdownClick}>
            <div onClick={() => handleStudyImportButtonSubmit(study.id)}>
              {study.name}
            </div>
          </li>
        ))}
      </div>
    </DropdownButton>
  );

  const chapterSelectionButton = lichessUser.loggedIn &&
    studyChapters &&
    studyChapters.length > 0 && (
      <DropdownButton label={"Import Chapter/Game"}>
        {studyChapters.map((chapter, index) => (
          <li
            key={`${chapter.chapterId}-${index}`}
            onClick={handleDropdownClick}
          >
            <div onClick={() => importPgn(chapter)}>{chapter.name}</div>
          </li>
        ))}
      </DropdownButton>
    );

  return (
    <div className="flex w-full flex-col justify-between gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {lichessLoginLogoutButton}
      </div>

      {lichessImportButton && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {lichessImportButton}
            {chapterSelectionButton}
          </div>
          <div>{lichessStudyLinkInput}</div>
        </>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-gray-500">
          <span className="bg-white px-2">OR</span>
        </div>
      </div>
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
