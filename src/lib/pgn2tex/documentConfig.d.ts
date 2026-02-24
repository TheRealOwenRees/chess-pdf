import type { ExtendedTags } from './index';
type Header = ExtendedTags | undefined;
export declare const documentSetup = "\\documentclass{article}\\usepackage{xskak}\\usepackage{multicol}\\usepackage[a4paper]{geometry}\\usepackage{parskip}\\geometry{left=1.25cm,right=1.25cm,top=1.5cm,bottom=1.5cm,columnsep=1.2cm}\\setlength{\\parindent}{0pt}";
export declare const beginDocument: (header: Header) => string;
export declare const endDocument = "\\end{multicols}\\end{document}";
export {};
