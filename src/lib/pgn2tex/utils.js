"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitiseString = void 0;
const sanitiseString = (str) => {
    const escapeChars = {
        '&': '\\&',
        _: '\\_',
    };
    const regex = new RegExp(Object.keys(escapeChars).join('|'), 'g');
    return str.replace(regex, (matched) => escapeChars[matched]).trim();
};
exports.sanitiseString = sanitiseString;
