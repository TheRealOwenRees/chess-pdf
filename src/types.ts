export type GamePGN = string | undefined;

export interface IChapter {
  chapterId?: string;
  pgn: string;
}

export interface Header {
  event: string;
  site: string;
  date: string;
  round: string;
  white: string;
  black: string;
  result: string;
  eco: string;
  whiteElo: string;
  blackElo: string;
  plyCount: string;
  eventDate: string;
  source: string;
  [key: string]: string;
}

export interface GameProps {
  pgn: GamePGN;
  headers: Header;
  diagrams: DiagramProps[];
  diagramClock: boolean;
}

export interface BoardProps {
  children: string | undefined;
  diagrams?: DiagramProps[];
}

export interface SectionHeadingProps {
  className?: string;
  text: string;
  textAccent?: string;
}

export interface FeatureProps {
  className?: string;
  title: string;
  text: string;
}

export interface FormFieldProps {
  fieldName: string;
  type: string;
}

export interface DiagramProps {
  ply: number;
  fen: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface TextFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  pattern?: RegExp;
  required: boolean | string;
  minLength?: number;
  maxLength?: number;
  errors: any;
  register: any;
}

// Game Context Reducer
// export interface GameAction {
//   type: 'SET_GAME' | 'CLEAR_GAME' | 'SET_HEADERS' | 'ADD_DIAGRAM' | 'DELETE_DIAGRAM'
//   payload?: {
//     pgn?: string
//     headers?: Header
//     ply?: number
//     fen?: string
//   }
// }

export interface Message {
  type: string;
  message: string;
}

export interface MessageAtomState {
  type: string;
  message: string;
  isSending: boolean;
  isSuccess: boolean;
}

export type GameAction =
  | { type: "SET_GAME"; payload: { pgn: string; headers: Header } }
  | { type: "CLEAR_GAME" }
  | { type: "SET_HEADERS"; payload: Header }
  | { type: "ADD_DIAGRAM"; payload: DiagramProps }
  | { type: "DELETE_DIAGRAM"; payload: { ply: number } }
  | { type: "TOGGLE_DIAGRAM_CLOCK"; payload: boolean };
