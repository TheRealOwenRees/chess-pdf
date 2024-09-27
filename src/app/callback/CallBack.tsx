"use client";

import { useEffect } from "react";

import { useSetAtom } from "jotai";
import { useSearchParams } from "next/navigation";

import { lichessUserAtom } from "@/atoms";
import { verifyToken } from "@/server/actions/lichess";

const Callback = () => {
  const params = useSearchParams();
  const code = params.get("code");
  const setLichessUser = useSetAtom(lichessUserAtom);

  useEffect(() => {
    (async function tokenVerification() {
      if (code) {
        const response = await verifyToken(code);
        if (response) {
          setLichessUser({ username: response.username, loggedIn: true });
        }
      }
    })();
  }, [code]);

  return <div>Verifying...</div>;
};

export default Callback;
