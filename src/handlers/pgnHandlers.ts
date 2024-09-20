import { GameProps } from "@/types";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";
import { buildPgnString, getHeaders } from "@/utils/pgnUtils";
import { downloadString } from "@/utils/stringUtils";
import { downloadPDF } from "@/utils/pdfUtils";
import { toast } from "react-toastify";

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

  if (selectedFile && selectedFile.name.endsWith('.pgn')) {
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
    const fileInput = document.getElementById('fileInput') as HTMLInputElement
    fileInput.value = ''
    e.target.files = null;
    toast.error('Not a supported file type', {
      toastId: 'file-type-error'
    })
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
    errorContact: any, // TODO fix any
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
    downloadPDF(await response.blob())  // TODO add response here? Make sure it opened before setting message
    toast.success('PDF generated successfully', {
      toastId: 'pdf-success'
    })
  } catch (error: any) {
    // TODO format time
    // TODO send full error message
    const response = await errorContact.mutateAsync({
      timestamp: new Date().toISOString(),
      error: error.message
    })
    if (response) {
      toast.error('Something went wrong generating the PDF', {
        toastId: 'pdf-error'
      })
    }
  } finally {
    setGeneratingPDF(false)
  }
}
