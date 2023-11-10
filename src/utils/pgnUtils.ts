import { GameProps, Header } from "@/types";

// Default headers for a new game
export const defaultHeaderFields = {
  event: "",
  site: "",
  date: "",
  round: "",
  white: "",
  black: "",
  result: "",
  eco: "",
  whiteElo: "",
  blackElo: "",
  plyCount: "",
  eventDate: "",
  source: "",
} as Header

// Get the headers from a pgn string
export const getHeaders = (pgn: string) => {
  const pgnHeader = pgn.split(/\n\n/g)[0]

  const getHeaderField = (field: string) => {
    const regex = new RegExp(`(?<=${field}.").*(?=")`);
    const match = pgnHeader.match(regex);
    return match && match[0] !== "undefined" ? match[0] : ""
  }

  return {
    event: getHeaderField("Event"),
    site: getHeaderField("Site"),
    date: getHeaderField("Date"),
    round: getHeaderField("Round"),
    white: getHeaderField("White"),
    black: getHeaderField("Black"),
    result: getHeaderField("Result"),
    eco: getHeaderField("ECO"),
    whiteElo: getHeaderField("WhiteElo"),
    blackElo: getHeaderField("BlackElo"),
    plyCount: getHeaderField("PlyCount"),
    eventDate: getHeaderField("EventDate"),
    source: getHeaderField("Source"),
  }
}

// Create a string based on new header values
export const buildPgnString = (game: GameProps) => {
  const moves = game.pgn?.split(/\n\n/g)[1]
  return `[Event "${game.headers.event}"]
[Site "${game.headers.site}"]
[Date "${game.headers.date}"]
[Round "${game.headers.round}"]
[White "${game.headers.white}"]
[Black "${game.headers.black}"]
[Result "${game.headers.result}"]
[ECO "${game.headers.eco}"]
[WhiteElo "${game.headers.whiteElo}"]
[BlackElo "${game.headers.blackElo}"]
[PlyCount "${game.headers.plyCount}"]
[EventDate "${game.headers.eventDate}"]
[Source "${game.headers.source}"]\n
${moves}`
}