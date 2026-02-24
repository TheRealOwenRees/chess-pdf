"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endDocument = exports.beginDocument = exports.documentSetup = void 0;
const documentStart = '\\documentclass{article}';
const documentPackages = '\\usepackage{xskak}\\usepackage{multicol}\\usepackage[a4paper]{geometry}\\usepackage{parskip}';
const documentGeometry = '\\geometry{left=1.25cm,right=1.25cm,top=1.5cm,bottom=1.5cm,columnsep=1.2cm}';
const documentLength = '\\setlength{\\parindent}{0pt}';
exports.documentSetup = `${documentStart}${documentPackages}${documentGeometry}${documentLength}`;
const beginDocument = (header) => {
    const isTitle = !!((header === null || header === void 0 ? void 0 : header.Title) ||
        (header === null || header === void 0 ? void 0 : header.Subtitle) ||
        (header === null || header === void 0 ? void 0 : header.Author) ||
        (header === null || header === void 0 ? void 0 : header.DateString) ||
        (header === null || header === void 0 ? void 0 : header.Event) ||
        (header === null || header === void 0 ? void 0 : header.Date) ||
        (header === null || header === void 0 ? void 0 : header.Site));
    const start = '\\begin{document}\\begin{multicols}{2}';
    const makeTitle = isTitle ? '\\maketitle' : '';
    const end = '\\newchessgame';
    return `${start}${makeTitle}${end}`;
};
exports.beginDocument = beginDocument;
exports.endDocument = '\\end{multicols}\\end{document}';
