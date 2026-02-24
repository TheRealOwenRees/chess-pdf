import type { Tags } from '@mliebelt/pgn-types';
export interface Diagram {
    ply: number;
    fen: string;
}
export interface ExtendedTags extends Partial<Tags> {
    Title?: string;
    Subtitle?: string;
    Author?: string;
    DateString?: string;
}
export default class Pgn2Tex {
    private readonly pgn;
    private diagrams;
    private readonly game;
    private moveStr;
    private readonly texStart;
    private readonly texEnd;
    private readonly header;
    private moves;
    private readonly diagramClock;
    private readonly sanitisedGame;
    constructor(pgn: string, diagrams: Diagram[], diagramClock?: boolean);
    private generateDateSiteTitle;
    private generatePlayersTitle;
    /**
     * Remove odd whitespace (☒) characters and comments inside square brackets.
     * @param pgn
     * @private
     */
    private static sanitiseGame;
    private addThreeDots;
    private sideToMove;
    private commentsAfter;
    private moveTime;
    private diagram;
    private variations;
    private format;
    /**
     * Convert PGN to LaTeX markdown
     * @returns {string} LaTeX markdown
     */
    toTex(): string;
}
