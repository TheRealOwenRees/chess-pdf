"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pgn_parser_1 = require("@mliebelt/pgn-parser");
const documentConfig_1 = require("./documentConfig");
const utils_1 = require("./utils");
class Pgn2Tex {
  constructor(pgn, diagrams, diagramClock = false) {
    var _a;
    this.pgn = pgn;
    this.diagrams = diagrams;
    this.sanitisedGame = Pgn2Tex.sanitiseGame(this.pgn);
    this.game = (0, pgn_parser_1.parseGame)(this.sanitisedGame);
    this.moveStr = "";
    const headerComponent =
      pgn === null || pgn === void 0 ? void 0 : pgn.split(/\n\n/g)[0];
    const titleMatch = headerComponent.match(/\[Title "([^"]+)"\]/);
    const subtitleMatch = headerComponent.match(/\[Subtitle "([^"]+)"\]/);
    const dateMatch = headerComponent.match(/\[Date "([^"]+)"\]/);
    const authorMatch = headerComponent.match(/\[Author "([^"]+)"\]/);
    const resultMatch = headerComponent.match(/\[Result "([^"]+)"\]/);
    if (
      (titleMatch === null || titleMatch === void 0 ? void 0 : titleMatch[1]) ||
      (subtitleMatch === null || subtitleMatch === void 0
        ? void 0
        : subtitleMatch[1])
    ) {
      this.header = {
        Title:
          titleMatch === null || titleMatch === void 0 ? void 0 : titleMatch[1],
        Subtitle:
          subtitleMatch === null || subtitleMatch === void 0
            ? void 0
            : subtitleMatch[1],
        Author:
          authorMatch === null || authorMatch === void 0
            ? void 0
            : authorMatch[1],
        DateString:
          dateMatch === null || dateMatch === void 0 ? void 0 : dateMatch[1],
        Result:
          resultMatch === null || resultMatch === void 0
            ? void 0
            : resultMatch[1],
      };
      this.texStart =
        `${documentConfig_1.documentSetup}` +
        `${this.header.Title ? `\\title{${this.header.Title}\\\\[2ex]` : ""}` +
        `${this.header.Subtitle ? `\\large{${this.header.Subtitle}}` : ""}` +
        `${this.header.DateString ? `\\date{${this.header.DateString}}` : "\\date{}"}` +
        `${this.header.Author ? `\\author{${this.header.Author}}` : ""}` +
        `${(0, documentConfig_1.beginDocument)(this.header)}`;
    } else {
      this.header = this.game.tags;
      const title = this.generatePlayersTitle();
      const dateSiteTitle = this.generateDateSiteTitle();
      this.texStart =
        `${documentConfig_1.documentSetup}` +
        `${title ? `\\title{${title}}\\\\[2ex]` : ""}` +
        `${dateSiteTitle ? `\\date{${dateSiteTitle}}` : "\\date{}"}` +
        `${((_a = this.header) === null || _a === void 0 ? void 0 : _a.Event) ? `\\author{${this.header.Event}}` : ""}` +
        `${(0, documentConfig_1.beginDocument)(this.header)}`;
    }
    this.texEnd = `\n${documentConfig_1.endDocument}`;
    this.moves = this.game.moves;
    this.diagramClock = diagramClock;
  }
  generateDateSiteTitle() {
    var _a;
    if (!this.header) return "";
    const dateComponent = (
      (_a = this.header.Date) === null || _a === void 0 ? void 0 : _a.value
    )
      ? this.header.Date.value
      : "";
    const siteComponent = this.header.Site ? this.header.Site : "";
    if (dateComponent && siteComponent)
      return `${dateComponent}, ${siteComponent}`;
    if (dateComponent) return `${dateComponent}`;
    if (siteComponent) return `${siteComponent}`;
    return "";
  }
  generatePlayersTitle() {
    if (!this.header) return "";
    const whiteName = this.header.White
      ? (0, utils_1.sanitiseString)(this.header.White)
      : "";
    const whiteElo = this.header.WhiteElo ? `(${this.header.WhiteElo})` : "";
    const whiteComponent = `${whiteName} ${whiteElo}`.trim();
    const blackName = this.header.Black
      ? (0, utils_1.sanitiseString)(this.header.Black)
      : "";
    const blackElo = this.header.BlackElo ? `(${this.header.BlackElo})` : "";
    const blackComponent = `${blackName} ${blackElo}`.trim();
    if (whiteComponent && blackComponent) {
      return `${whiteComponent} - ${blackComponent}`;
    }
    return whiteComponent || blackComponent || "";
  }
  /**
   * Remove odd whitespace (☒) characters and comments inside square brackets.
   * @param pgn
   * @private
   */
  static sanitiseGame(pgn) {
    const whitespaceChars = "/☒/g";
    const squareBracketComments = /(?<=\{)\[[\s\S]*?]\s?/g;
    return (pgn ?? "")
      .replace(whitespaceChars, " ")
      .replace(squareBracketComments, "");
  }
  addThreeDots(move) {
    if (move.turn === "w") this.moveStr += `\\textbf{${move.moveNumber}...}`;
  }
  sideToMove(move) {
    if (move.turn === "w") this.moveStr += `\\textbf{${move.moveNumber}.}`;
    this.moveStr += `\\textbf{${move.notation.notation}} `;
  }
  commentsAfter(move) {
    if (move.commentAfter) {
      this.moveStr += `\\newline ${(0, utils_1.sanitiseString)(move.commentAfter)} \\par `;
      this.addThreeDots(move);
    }
  }
  moveTime(move) {
    if (!this.diagramClock) return { whiteTime: null, blackTime: null };
    try {
      const { moveNumber } = move;
      const moveClock = this.game.moves[moveNumber].commentDiag.clk;
      const previousMoveClock = this.game.moves[moveNumber - 1].commentDiag.clk;
      const whiteTime = move.turn === "w" ? moveClock : previousMoveClock;
      const blackTime = move.turn === "b" ? moveClock : previousMoveClock;
      return { whiteTime, blackTime };
    } catch (_a) {
      return { whiteTime: null, blackTime: null };
    }
  }
  diagram(move, index) {
    const diagramExists = this.diagrams.find((x) => x.ply === index + 1);
    const { whiteTime, blackTime } = this.moveTime(move);
    if (whiteTime && blackTime && diagramExists) {
      this.moveStr += `\\par\\nobreak\\textbf{${blackTime}}\\par\\nobreak\\chessboard[setfen=${diagramExists.fen}, vmargin=false]\\par\\nobreak\\vspace{1mm}\\nobreak\\textbf{${whiteTime}}\\par`;
      this.addThreeDots(move);
    } else if (diagramExists) {
      this.moveStr += `\\par\\chessboard[setfen=${diagramExists.fen}]\\par `;
      this.addThreeDots(move);
    }
  }
  variations(move, depth = 1) {
    let variationString = "";
    if (move.variations.length > 0) {
      move.variations.forEach((variation) => {
        variationString += "(";
        variation.forEach((varMove, varIndex) => {
          const dots = varMove.turn === "b" && varIndex === 0 ? "..." : "";
          const moveNumber =
            varMove.turn === "w" ? `${varMove.moveNumber}.` : "";
          variationString += `${dots}${moveNumber}${varMove.notation.notation} `;
          variationString += varMove.commentAfter
            ? `\\textit{${varMove.commentAfter.trim()}} `
            : "";
          variationString += this.variations(varMove, depth + 1);
        });
        // if the variation starts with a move number, add a space after the closing bracket
        if (/\)\w/.test(variationString)) {
          variationString = variationString.replace(/\)(\w)/g, ") $1");
        }
        variationString = `${variationString.trim()}) `;
      });
      if (depth === 1) {
        this.moveStr += `${variationString.trim()} `;
        this.addThreeDots(move);
      }
    }
    return variationString.trim();
  }
  format() {
    var _a, _b;
    // add result if present in header
    if ((_a = this.header) === null || _a === void 0 ? void 0 : _a.Result) {
      this.moveStr += `\\textbf{${(_b = this.header) === null || _b === void 0 ? void 0 : _b.Result}}`;
    }
    this.moveStr = this.moveStr.replace(/#/g, "\\#"); // remove TeX special characters
    this.moveStr = this.moveStr.replace(/ {2,}/g, " "); // remove double spaces
  }
  /**
   * Convert PGN to LaTeX markdown
   * @returns {string} LaTeX markdown
   */
  toTex() {
    this.moves.forEach((move, index) => {
      this.sideToMove(move);
      this.commentsAfter(move);
      this.diagram(move, index);
      this.variations(move);
    });
    this.format();
    return `${this.texStart}${this.moveStr}${this.texEnd}`;
  }
}
exports.default = Pgn2Tex;
