"use strict";
// src/Utils/ersatzPlanung.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sucheUndSetzeErsatz = sucheUndSetzeErsatz;
const auftraege_1 = require("../data/auftraege");
const mitarbeiter_1 = require("../data/mitarbeiter");
const benachrichtigung_1 = require("./benachrichtigung");
// Dummy-Funktion für automatische Ersatzplanung
function sucheUndSetzeErsatz(krankMitarbeiterId, datum) {
    console.log(`🔁 Suche Ersatz für Mitarbeiter ${krankMitarbeiterId} am ${datum}...`);
    // Finde betroffene Aufträge
    const betroffeneAuftraege = auftraege_1.auftraege.filter(a => a.datum === datum &&
        a.mitarbeiter.includes(krankMitarbeiterId));
    for (const auftrag of betroffeneAuftraege) {
        const index = auftrag.mitarbeiter.indexOf(krankMitarbeiterId);
        if (index !== -1) {
            // Suche Ersatzmitarbeiter
            const ersatz = mitarbeiter_1.mitarbeiter.find(m => m.verfuegbar && m.id !== krankMitarbeiterId);
            if (ersatz) {
                auftrag.mitarbeiter[index] = ersatz.id;
                (0, benachrichtigung_1.sendeBenachrichtigung)("mitarbeiter", `Du bist als Ersatz eingeteilt für ${datum}.`);
                console.log(`✅ Ersatz ${ersatz.id} wurde zugewiesen für Auftrag ${auftrag.id}`);
            }
            else {
                console.log(`⚠️ Kein Ersatz gefunden für Auftrag ${auftrag.id}`);
            }
        }
    }
}
