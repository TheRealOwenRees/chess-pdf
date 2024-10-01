"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";
import { redirect, useSearchParams } from "next/navigation";

import { lichessUserAtom } from "@/atoms";
import { verifyToken } from "@/server/actions/lichess";

const Callback = () => {
  const params = useSearchParams();
  const code = params.get("code");
  const [lichessUser, setLichessUser] = useAtom(lichessUserAtom);

  useEffect(() => {
    (async function tokenVerification() {
      if (code) {
        const response = await verifyToken(code);
        if (response) {
          setLichessUser({ username: response.username, loggedIn: true });
        }
      }
    })();
  }, [code, setLichessUser]);

  lichessUser.loggedIn && redirect("/chessboard");

  return <div>Verifying...</div>;
};

export default Callback;
