import { GameAction, GameProps } from "@/types";
import { ChangeEvent, Dispatch, MouseEvent } from "react";
import { buildPgnString, getHeaders } from "@/utils/pgnUtils";
import { downloadString } from "@/utils/stringUtils";

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

export const handleSavePDF = async (e: MouseEvent<HTMLButtonElement>, gameState: GameProps) => {
  e.preventDefault()
  const pgnString = buildPgnString(gameState)
  const { diagrams } = gameState
  // TODO change URL depending on environment
  try {
    const apiBaseURL =
      process.env.NODE_ENV === 'production'
        ? process.env.API_BASE_URL as string
        : 'http://localhost:5000/api/v1'
    const response = await fetch(`${apiBaseURL}/pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pgn: pgnString, diagrams: diagrams })
  })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // opening of PDF in new tab // TODO move into separate function?
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    window.open(url, '_blank')
  } catch (error) {
    // @ts-ignore // TODO fix
    throw new Error(`Error rendering PDF: ${error.message}`)
  }
}