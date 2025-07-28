"use strict";
// src/Services/krankmeldungService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKrankmeldungenService = exports.meldeKrankheitService = void 0;
const krankmeldungen = [];
const meldeKrankheitService = async (data) => {
    krankmeldungen.push(data);
    return data;
};
exports.meldeKrankheitService = meldeKrankheitService;
const getKrankmeldungenService = async () => {
    return krankmeldungen;
};
exports.getKrankmeldungenService = getKrankmeldungenService;
