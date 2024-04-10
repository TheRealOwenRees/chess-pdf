import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from "react";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from "react-toastify";
import './globals.css'
import "react-toastify/dist/ReactToastify.css";
import '@/scss/index.scss'

import Navbar from '@/app/components/Navbar'
import Footer from "@/app/components/Footer";

import { Providers } from "@/providers/providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChessScribe',
  description: 'Create PDFs of your chess games from a PGN file',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" data-theme="customLightTheme">
    <head>
      <link rel="icon" href="/favicon.svg" sizes="any"/>
    </head>
    <Providers>
      <body className={inter.className}>
        <div className="bg-base-100 grid">
          <Navbar />
            <div className="relative min-h-[calc(100vh-114px-80px)] bg-white place-self-center">
              {children}
              <ToastContainer position="bottom-right" />
            </div>
          <Footer />
        </div>
        <Analytics />
      </body>
    </Providers>
    </html>
  )
}
