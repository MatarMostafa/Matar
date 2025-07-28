"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBenachrichtigung = exports.getBenachrichtigungen = exports.createBenachrichtigung = void 0;
// Beispiel-Datenhaltung (später durch DB ersetzen)
let benachrichtigungen = [];
// Neue Benachrichtigung erstellen
const createBenachrichtigung = (data) => {
    const neueBenachrichtigung = { ...data, id: Date.now().toString() };
    benachrichtigungen.push(neueBenachrichtigung);
    return neueBenachrichtigung;
};
exports.createBenachrichtigung = createBenachrichtigung;
// Alle Benachrichtigungen abrufen
const getBenachrichtigungen = () => {
    return benachrichtigungen;
};
exports.getBenachrichtigungen = getBenachrichtigungen;
// Benachrichtigung löschen
const deleteBenachrichtigung = (id) => {
    benachrichtigungen = benachrichtigungen.filter(b => b.id !== id);
};
exports.deleteBenachrichtigung = deleteBenachrichtigung;
