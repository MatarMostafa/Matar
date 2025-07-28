"use strict";
// src/Services/autoPlanung.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.automatischePlanung = void 0;
const einsaetze_1 = require("../data/einsaetze");
const auftraege_1 = require("../data/auftraege");
const mitarbeiter_1 = require("../data/mitarbeiter");
const mitarbeitersperren_1 = require("../data/mitarbeitersperren"); // Wichtig: neue Datei
// Hilfsfunktion: Prüfe ob Mitarbeiter gesperrt ist
const istGesperrt = (mitarbeiterId, datum) => {
    return mitarbeitersperren_1.sperren.some((s) => {
        return (s.mitarbeiterId === mitarbeiterId &&
            new Date(datum) >= new Date(s.startDatum) &&
            new Date(datum) <= new Date(s.endDatum));
    });
};
// Automatische Einsatzplanung
const automatischePlanung = () => {
    const heute = new Date();
    const heuteString = heute.toISOString().split("T")[0];
    const offeneAuftraege = auftraege_1.auftraege.filter((a) => a.status === "offen");
    offeneAuftraege.forEach((auftrag) => {
        const freieMitarbeiter = mitarbeiter_1.mitarbeiter.filter((m) => {
            const istSchonEingeplant = einsaetze_1.einsaetze.some((e) => e.mitarbeiterId === m.id && e.datum === auftrag.datum);
            return (m.qualifikationen.includes(auftrag.qualifikation) &&
                !istSchonEingeplant &&
                !istGesperrt(m.id, auftrag.datum) // Sperrprüfung
            );
        });
        if (freieMitarbeiter.length > 0) {
            const mitarbeiterGefunden = freieMitarbeiter[0];
            einsaetze_1.einsaetze.push({
                id: einsaetze_1.einsaetze.length + 1,
                auftragId: auftrag.id,
                mitarbeiterId: mitarbeiterGefunden.id,
                datum: auftrag.datum,
            });
            auftrag.status = "geplant";
        }
    });
};
exports.automatischePlanung = automatischePlanung;
