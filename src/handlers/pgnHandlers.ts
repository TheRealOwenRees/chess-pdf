import { GameAction, GameProps, Message } from "@/types";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";
import { buildPgnString, getHeaders } from "@/utils/pgnUtils";
import { downloadString } from "@/utils/stringUtils";
import { openPDFInNewTab } from "@/utils/pdfUtils";
import { handleSetMessage } from "@/handlers/messageHandlers";

export const handleClearGame = (
  e: MouseEvent<HTMLButtonElement>,
  gameDispatch: any) => { // TODO fix any type
  e.preventDefault()
  const fileInput = document.getElementById('fileInput') as HTMLInputElement
  fileInput.value = ''
  gameDispatch({ type: 'CLEAR_GAME' })
}

export const handleLoadPGN = (
  e: ChangeEvent<HTMLInputElement>,
  gameDispatch: any) => { // TODO fix any type
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
        gameDispatch({ type: 'CLEAR_GAME' })
      }
    }
    reader.readAsText(selectedFile);
  } else {
    gameDispatch({ type: 'CLEAR_GAME' })
    console.log('not a supported file')
    const fileInput = document.getElementById('fileInput') as HTMLInputElement
    fileInput.value = ''
    e.target.files = null;
    alert('Not a supported file type') // TODO replace with toast
  }
}

export const handleSavePGN = (e: MouseEvent<HTMLButtonElement>, gameState: GameProps) => {
  e.preventDefault()
  const pgnString = buildPgnString(gameState)
  downloadString(pgnString, 'game.pgn')
}

export const handleSavePDF = async (
    e: MouseEvent<HTMLButtonElement>,
    gameState: GameProps,
    setGeneratingPDF: Dispatch<SetStateAction<boolean>>,
    setMessageAtom: any,  // TODO fix any type
    errorContact: any // TODO fix any type
) => {
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
    body: JSON.stringify({ pgn: pgnString, diagrams: diagrams, diagramClock: gameState.diagramClock })
  })
    openPDFInNewTab(await response.blob())  // TODO add response here? Make sure it opened before setting message
    handleSetMessage('success', 'PDF generated successfully', setMessageAtom)
  } catch (error: any) {
    // TODO format time
    // TODO send full error message
    const response = await errorContact.mutateAsync({
      timestamp: new Date().toISOString(),
      error: error.message
    })
    if (response) {
      handleSetMessage('error', 'Something went wrong generating the PDF', setMessageAtom)
    }
  } finally {
    setGeneratingPDF(false)
  }
}
