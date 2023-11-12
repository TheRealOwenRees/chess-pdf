import { GameAction, GameProps } from "@/types";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";
import { buildPgnString, getHeaders } from "@/utils/pgnUtils";
import { downloadString } from "@/utils/stringUtils";
import { openPDFInNewTab } from "@/utils/pdfUtils";

// TODO write tests for these handlers
export const handleClearGame = (
  e: MouseEvent<HTMLButtonElement>,
  gameDispatch: Dispatch<GameAction>) => {
  e.preventDefault()
  const fileInput = document.getElementById('fileInput') as HTMLInputElement
  fileInput.value = ''
  gameDispatch({ type: 'CLEAR_GAME' })
}

export const handleLoadPGN = (
  e: ChangeEvent<HTMLInputElement>,
  gameDispatch: Dispatch<GameAction>) => {
  e.preventDefault()
  const selectedFile = e.target.files && e.target.files[0]

  if (selectedFile && (
    selectedFile.type === 'application/x-chess-pgn' ||
    selectedFile.type === 'application/vnd.chess-pgn')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const pgnData = e.target?.result
      let pgnString

      if (pgnData) {
        if (typeof pgnData === 'string') {
        pgnString = pgnData
        } else {
          pgnString = new TextDecoder().decode(pgnData)
        }
      }

      if (pgnString) {
        const headers = getHeaders(pgnString)
        gameDispatch({ type: 'SET_GAME', payload: { pgn: pgnString, headers: headers } })
      } else {
        gameDispatch({ type: 'CLEAR_GAME' }) // TODO throw an error handling this case more explicitly
      }
    }
    reader.readAsText(selectedFile);
  } else {
    gameDispatch({ type: 'CLEAR_GAME' }) // TODO throw an error, showing a message on screen that the file type is not supported
  }
}

export const handleSavePGN = (e: MouseEvent<HTMLButtonElement>, gameState: GameProps) => {
  e.preventDefault()
  const pgnString = buildPgnString(gameState)
  downloadString(pgnString, 'game.pgn')
}

export const handleSavePDF = async (e: MouseEvent<HTMLButtonElement>, gameState: GameProps, setGeneratingPDF: Dispatch<SetStateAction<boolean>>) => {
  e.preventDefault()
  setGeneratingPDF(true)
  const pgnString = buildPgnString(gameState)
  const { diagrams } = gameState

  try {
    const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string
    const response = await fetch(`${apiBaseURL}/pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pgn: pgnString, diagrams: diagrams })
  })
    openPDFInNewTab(await response.blob())
  } catch (error) {
    // @ts-ignore // TODO fix
    throw new Error(`Error rendering PDF: ${error.message}`)
  } finally {
    setGeneratingPDF(false)
  }
}