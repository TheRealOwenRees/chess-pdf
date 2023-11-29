import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from "react";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/scss/index.scss'

import Navbar from '@/app/components/Navbar'
import Footer from "@/app/components/Footer";

import { Providers } from "@/providers/providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chess PDF',
  description: 'Create PDFs of your chess games from a PGN file',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
    <head>
      <link rel="icon" href="/favicon.svg" sizes="any"/>
    </head>
    <Providers>
      <body className={inter.className}>
        <div className="bg-base-100 text-gray-900 grid">
          <Navbar />
            <div className="relative min-h-[calc(100vh-114px-76px)] bg-white place-self-center">{children}</div>
          <Footer />
        </div>
        <Analytics />
      </body>
    </Providers>
    </html>
  )
}
