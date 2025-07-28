"use strict";
// src/Services/mitarbeitersperreService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.erstelleSperre = exports.getAlleSperren = exports.istGesperrt = exports.sperreLoeschen = exports.sperreAktualisieren = exports.sperreNachId = exports.alleSperren = exports.sperreErstellen = void 0;
let mitarbeitersperren = [];
let aktuelleId = 1;
// Neue Sperre anlegen
const sperreErstellen = (daten) => {
    const neueSperre = {
        id: aktuelleId++,
        ...daten,
    };
    mitarbeitersperren.push(neueSperre);
    return neueSperre;
};
exports.sperreErstellen = sperreErstellen;
// Alle Sperren holen
const alleSperren = () => {
    return mitarbeitersperren;
};
exports.alleSperren = alleSperren;
// Einzelne Sperre abrufen
const sperreNachId = (id) => {
    return mitarbeitersperren.find((s) => s.id === id);
};
exports.sperreNachId = sperreNachId;
// Sperre aktualisieren
const sperreAktualisieren = (id, daten) => {
    const index = mitarbeitersperren.findIndex((s) => s.id === id);
    if (index === -1)
        return null;
    mitarbeitersperren[index] = { ...mitarbeitersperren[index], ...daten };
    return mitarbeitersperren[index];
};
exports.sperreAktualisieren = sperreAktualisieren;
// Sperre löschen
const sperreLoeschen = (id) => {
    const startLength = mitarbeitersperren.length;
    mitarbeitersperren = mitarbeitersperren.filter((s) => s.id !== id);
    return mitarbeitersperren.length < startLength;
};
exports.sperreLoeschen = sperreLoeschen;
// Prüfung: Ist Mitarbeiter im Zeitraum gesperrt?
const istGesperrt = (mitarbeiterId, datum) => {
    return mitarbeitersperren.some((s) => {
        return (s.mitarbeiterId === mitarbeiterId &&
            datum >= s.startDatum &&
            datum <= s.endDatum);
    });
};
exports.istGesperrt = istGesperrt;
// src/Services/mitarbeitersperreService.ts
const sperren_1 = require("../data/sperren");
const getAlleSperren = () => {
    return sperren_1.sperren;
};
exports.getAlleSperren = getAlleSperren;
const erstelleSperre = (sperre) => {
    const neueSperre = {
        id: sperren_1.sperren.length + 1,
        ...sperre,
    };
    sperren_1.sperren.push(neueSperre);
    return neueSperre;
};
exports.erstelleSperre = erstelleSperre;
const istGesperrt = (mitarbeiterId, datum) => {
    return sperren_1.sperren.some((s) => s.mitarbeiterId === mitarbeiterId &&
        datum >= s.von &&
        datum <= s.bis);
};
exports.istGesperrt = istGesperrt;
