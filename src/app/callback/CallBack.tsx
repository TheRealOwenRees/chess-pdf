"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";
import { redirect, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { lichessUserAtom } from "@/atoms";
import { verifyToken } from "@/server/actions/lichess";

const Callback = () => {
  const params = useSearchParams();
  const code = params.get("code");
  const error = params.get("error");
  const errorDescription = params.get("error_description");
  const [lichessUser, setLichessUser] = useAtom(lichessUserAtom);

  useEffect(() => {
    (async function tokenVerification() {
      // verify token if code is present
      if (code) {
        const response = await verifyToken(code);
        if (response) {
          setLichessUser({ username: response.username, loggedIn: true });
          toast.success(`Logged in as ${response.username}`, {
            toastId: "lichess-login-success",
          });
        }
      }

      // handle error if access denied
      if (error) {
        toast.error(
          `Error logging in: ${errorDescription ?? "unknown reason"}`,
          {
            toastId: "lichess-login-error",
          },
        );
      }
    })();
  }, [code, setLichessUser]);

  useEffect(() => {
    (lichessUser.loggedIn || error) && redirect("/chessboard");
  }, [lichessUser, error]);

  return <div>Verifying...</div>;
};

export default Callback;
