'use client'

import { ReactNode } from "react";
import { TrpcProvider } from "@/providers/trpcProvider";
import { GameProvider } from "@/context/GameContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GameProvider>
      <TrpcProvider>
        {children}
      </TrpcProvider>
    </GameProvider>
  )
}