import { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { Providers } from "@/providers/providers";
import "@/scss/index.scss";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChessScribe",
  description: "Create PDFs of your chess games from a PGN file",
  keywords: ["chess", "pgn", "pdf", "chess games", "chess notation"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="customLightTheme">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <Providers>
        <body className={inter.className}>
          <div className="grid bg-base-100">
            <Navbar />
            <div className="relative min-h-[calc(100vh-114px-80px)] place-self-center bg-white">
              {children}
              <ToastContainer position="bottom-right" />
            </div>
            <Footer />
          </div>
          <Analytics />
        </body>
      </Providers>
    </html>
  );
}
