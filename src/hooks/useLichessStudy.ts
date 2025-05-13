import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useAtom, useAtomValue } from "jotai/index";
import { toast } from "react-toastify";

import { gameAtom, lichessUserAtom } from "@/atoms";
import useLichessOAuth from "@/hooks/useLichessOAuth";
import usePgn from "@/hooks/usePgn";
import { IChapter } from "@/types";
import { getHeaders } from "@/utils/pgnUtils";

interface IStudy {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const useLichessStudy = () => {
  const lichessUser = useAtomValue(lichessUserAtom);
  const [_, gameDispatch] = useAtom(gameAtom);
  const [userStudies, setUserStudies] = useState<IStudy[] | undefined>([]);
  const [studyChapters, setStudyChapters] = useState<IChapter[]>([]);
  const [studySearchTerm, setStudySearchTerm] = useState("");
  const [filteredUserStudies, setFilteredUserStudies] = useState<
    IStudy[] | undefined
  >([]);

  const { clearPgn } = usePgn();
  const { lichessGetUserStudies, lichessAllChapters } = useLichessOAuth();

  // load user studies on login
  useEffect(() => {
    if (lichessUser.username && lichessUser.loggedIn) {
      (async () => {
        const studies = await lichessGetUserStudies();
        setUserStudies(studies);
        setFilteredUserStudies(studies);
      })();
    }
  }, [lichessUser]);

  const importPgn = (chapter: IChapter) => {
    if (chapter.name) {
      const headers = getHeaders(chapter.pgn);
      gameDispatch({
        type: "SET_GAME",
        payload: { pgn: chapter.pgn, headers: headers },
      });
      toast.success(`${chapter.name} imported successfully`, {
        toastId: `${chapter.name}-lichess-import-success`,
      });
    }
  };

  const studySearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    if (!searchTerm) {
      setStudySearchTerm("");
      setFilteredUserStudies(userStudies);
    }

    setStudySearchTerm(searchTerm);
    const filteredStudies = userStudies?.filter((study) =>
      study.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUserStudies(filteredStudies);
  };

  // clear search terms and reset filtered studies
  const clearStudySearch = () => {
    setStudySearchTerm("");
    setFilteredUserStudies(userStudies);
  };

  // load chapters on study selection
  const studySelection = async (studyId: string) => {
    const response = await lichessAllChapters(studyId);

    if ("error" in response) {
      setStudyChapters([]);
      toast.error(response.error);
      return;
    }

    clearPgn();
    setStudyChapters(response);
    toast.success(`Study loaded`);
  };

  // parse study id from url or input, then load chapters
  const importStudyFromUrl = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let studyId: string;
    const form = new FormData(e.currentTarget);
    const input = form.get("lichessStudyUrl") as string;

    if (input) {
      studyId = input.includes("/") ? input.split("/").pop()! : input;
      await studySelection(studyId);
    }
  };

  return {
    importPgn,
    importStudyFromUrl,
    userStudies,
    setUserStudies,
    filteredUserStudies,
    setFilteredUserStudies,
    studyChapters,
    setStudyChapters,
    studySearchTerm,
    setStudySearchTerm,
    clearStudySearch,
    studySearch,
    studySelection,
  };
};

export default useLichessStudy;
