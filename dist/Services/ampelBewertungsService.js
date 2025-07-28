"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBewertung = exports.createBewertung = exports.getBewertungenByMitarbeiter = exports.getAllBewertungen = void 0;
const uuid_1 = require("uuid");
let bewertungen = [];
const getAllBewertungen = () => {
    return bewertungen;
};
exports.getAllBewertungen = getAllBewertungen;
const getBewertungenByMitarbeiter = (mitarbeiterId) => {
    return bewertungen.filter(b => b.mitarbeiterId === mitarbeiterId);
};
exports.getBewertungenByMitarbeiter = getBewertungenByMitarbeiter;
const createBewertung = (data) => {
    const neueBewertung = { ...data, id: (0, uuid_1.v4)() };
    bewertungen.push(neueBewertung);
    return neueBewertung;
};
exports.createBewertung = createBewertung;
const deleteBewertung = (id) => {
    const index = bewertungen.findIndex(b => b.id === id);
    if (index !== -1) {
        const deleted = bewertungen.splice(index, 1)[0];
        return deleted;
    }
    return null;
};
exports.deleteBewertung = deleteBewertung;
