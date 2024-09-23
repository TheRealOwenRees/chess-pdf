"use client"

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { verifyToken } from "@/server/actions/lichess";

const Callback = () => {
  // TODO if lichessToken exists in cookies, redirect to /chessboard

  const params = useSearchParams()
  const code = params.get('code')

  useEffect(() => {
    if (code) {
      verifyToken(code)
    }
  }, [code]);

  return (
    <div>Verifying...</div>
  )
}

export default Callback;
