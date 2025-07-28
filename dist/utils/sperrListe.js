"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sperrungAufheben = exports.mitarbeiterSperren = void 0;
// src/Utils/sperrListe.ts
const mitarbeiter_1 = require("../data/mitarbeiter");
const mitarbeiterSperren = (mitarbeiterId, kundeId) => {
    const mit = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mit)
        return;
    mit.sperrungen = mit.sperrungen || [];
    if (!mit.sperrungen.includes(kundeId)) {
        mit.sperrungen.push(kundeId);
        console.log(`⚠️  Mitarbeiter ${mitarbeiterId} für Kunde ${kundeId} gesperrt`);
    }
};
exports.mitarbeiterSperren = mitarbeiterSperren;
const sperrungAufheben = (mitarbeiterId, kundeId) => {
    const mit = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mit || !mit.sperrungen)
        return;
    mit.sperrungen = mit.sperrungen.filter((id) => id !== kundeId);
    console.log(`🔓 Sperrung aufgehoben für MA ${mitarbeiterId} bei Kunde ${kundeId}`);
};
exports.sperrungAufheben = sperrungAufheben;
