"use strict";
// src/Utils/benachrichtigung.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendeBenachrichtigung = sendeBenachrichtigung;
function sendeBenachrichtigung(empfaenger, text) {
    // Hier später Push-Benachrichtigung integrieren
    console.log(`🔔 Nachricht an ${empfaenger}: ${text}`);
}
// src/Utils/benachrichtigung.ts
const sendeBenachrichtigung = (empfaenger, nachricht) => {
    console.log(`📨 Nachricht an ${empfaenger}: ${nachricht}`);
};
exports.sendeBenachrichtigung = sendeBenachrichtigung;
