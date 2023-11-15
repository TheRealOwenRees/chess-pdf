import { Action, DiagramProps, GameProps, Header } from "@/types";
import { defaultHeaderFields } from "@/utils/pgnUtils";

export const initialGameState = {
  pgn: undefined,
  headers: defaultHeaderFields as Header,
  diagrams: [] as DiagramProps[]
}

export const gameReducer = (state: GameProps, action: Action) => {
  switch (action.type) {
    case 'SET_GAME':
      return {
        pgn: action.payload.pgn,
        headers: action.payload.headers,
        diagrams: []
      }
    case 'CLEAR_GAME':
      return initialGameState
    case 'SET_HEADERS':
      return {
        ...state,
        headers: action.payload
      }
    case 'ADD_DIAGRAM':
      return {
        ...state,
        diagrams: [...state.diagrams, action.payload]
      }
    case 'DELETE_DIAGRAM':
      return {
        ...state,
        diagrams: state.diagrams.filter((diagram: DiagramProps) => diagram.ply !== action.payload.ply)
      }
    default:
      return state
  }
}