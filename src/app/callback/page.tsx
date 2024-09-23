"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { verifyToken } from "@/server/actions/lichess";
import { lichessUserAtom } from "@/atoms";
import { useSetAtom } from "jotai";

const Callback = () => {
  const params = useSearchParams()
  const code = params.get('code')
  const setLichessUser = useSetAtom(lichessUserAtom)

  useEffect(() => {
    (async function tokenVerification() {
      if (code) {
        const response =  await verifyToken(code)
        if (response.username) {
          setLichessUser({ username: response.username, loggedIn: true })
        }
      }
    }())
  }, [code]);

  return (
    <div>Verifying...</div>
  )
}

export default Callback;
