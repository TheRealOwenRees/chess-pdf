'use client'

import { ReactNode } from "react";
import { Provider } from "jotai"
import { TrpcProvider } from "@/providers/trpcProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <TrpcProvider>
        {children}
      </TrpcProvider>
    </Provider>
  )
}