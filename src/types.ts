export type GamePGN = string | undefined

export interface Header {
  event: string,
  site: string,
  date: string,
  round: string,
  white: string,
  black: string,
  result: string,
  eco: string,
  whiteElo: string,
  blackElo: string,
  plyCount: string,
  eventDate: string,
  source: string,
  [key: string]: string
}

export interface GameProps {
  pgn: GamePGN,
  headers: Header,
  diagrams: DiagramProps[]
}

export interface BoardProps {
  children: string | undefined
  diagrams: DiagramProps[]
  screenWidth?: number
}

export interface SectionHeadingProps {
  className?: string
  text: string
  textAccent?: string
}

export interface FeatureProps {
  className?: string
  title: string
  text: string
}

export interface FormFieldProps {
  fieldName: string
  type: string
}

export interface DiagramProps {
  ply: number
  fen: string
}

export interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
}

export interface TextFieldProps {
  label: string
  name: string
  placeholder?: string
  pattern?: RegExp
  required: boolean | string
  minLength?: number
  maxLength?: number
  errors: any
  register: any
}

// Game Context Reducer
export interface GameAction {
  type: 'SET_GAME' | 'CLEAR_GAME' | 'SET_HEADERS' | 'ADD_DIAGRAM' | 'DELETE_DIAGRAM'
  payload?: {
    pgn?: string
    headers?: Header
    ply?: number
    fen?: string
  }
}

export interface MessageStatus {
  isSuccess: boolean
  isSending: boolean
  message: string
}

export interface Message {
  type: string
  message: string
}