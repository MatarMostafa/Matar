"use strict";
// src/Utils/pushBenachrichtigung.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.benachrichtigeMitarbeiter = void 0;
/**
 * Diese Funktion simuliert das Senden einer Push-Benachrichtigung an einen bestimmten Mitarbeiter.
 * Später kann hier Firebase, OneSignal oder ein anderes Push-System eingebaut werden.
 */
const benachrichtigeMitarbeiter = (mitarbeiterId, nachricht) => {
    console.log(`📢 Push an Mitarbeiter ${mitarbeiterId}: ${nachricht}`);
};
exports.benachrichtigeMitarbeiter = benachrichtigeMitarbeiter;
