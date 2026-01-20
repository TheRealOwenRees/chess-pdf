import type { Metadata } from "next";

import ChessboardLayout from "@/app/chessboard/ChessboardLayout";

export const metadata: Metadata = {
  title: "ChessScribe | Chessboard",
  description: "Convert your PGN file to a PDF of your chess game",
};

const Chessboard = () => {
  return (
    <>
      <ChessboardLayout />
    </>
  );
};

export default Chessboard;
