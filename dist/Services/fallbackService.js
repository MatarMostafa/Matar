"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setzeErsatzImAuftrag = exports.findeErsatzMitarbeiter = exports.handleMitarbeiterAusfall = void 0;
const mitarbeiter_1 = require("../data/mitarbeiter");
const einsaetze_1 = require("../data/einsaetze");
const handleMitarbeiterAusfall = (req, res) => {
    const { mitarbeiterId, datum } = req.body;
    const ausfallEinsatz = einsaetze_1.einsaetze.find((einsatz) => einsatz.mitarbeiterId === mitarbeiterId &&
        einsatz.datum === datum);
    if (!ausfallEinsatz) {
        return res.status(404).json({ message: "Kein Einsatz für diesen Mitarbeiter an diesem Tag gefunden" });
    }
    const qualifikation = mitarbeiter_1.mitarbeiter.find(m => m.id === mitarbeiterId)?.qualifikation;
    const ersatz = mitarbeiter_1.mitarbeiter.find(m => m.id !== mitarbeiterId &&
        m.qualifikation === qualifikation &&
        !einsaetze_1.einsaetze.some(e => e.mitarbeiterId === m.id && e.datum === datum));
    if (!ersatz) {
        return res.status(404).json({ message: "Kein Ersatzmitarbeiter verfügbar" });
    }
    ausfallEinsatz.mitarbeiterId = ersatz.id;
    return res.status(200).json({
        message: "Ersatzmitarbeiter erfolgreich zugewiesen",
        einsatz: ausfallEinsatz,
        ersatzMitarbeiter: ersatz
    });
};
exports.handleMitarbeiterAusfall = handleMitarbeiterAusfall;
// src/Services/fallbackService.ts
const auftraege_1 = require("../data/auftraege");
const abwesenheiten_1 = require("../data/abwesenheiten");
const mitarbeitersperreService_1 = require("./mitarbeitersperreService");
const findeErsatzMitarbeiter = (ausfallMitarbeiterId, auftragsDatum, qualifikation) => {
    const verfuegbare = mitarbeiter_1.mitarbeiter.filter((m) => {
        if (m.id === ausfallMitarbeiterId ||
            !m.qualifikationen.includes(qualifikation) ||
            abwesenheiten_1.abwesenheiten.some((a) => a.mitarbeiterId === m.id && a.datum === auftragsDatum) ||
            (0, mitarbeitersperreService_1.istGesperrt)(m.id, auftragsDatum)) {
            return false;
        }
        return true;
    });
    return verfuegbare.length > 0 ? verfuegbare[0].id : null;
};
exports.findeErsatzMitarbeiter = findeErsatzMitarbeiter;
const setzeErsatzImAuftrag = (auftragId, neuerMitarbeiterId) => {
    const auftrag = auftraege_1.auftraege.find((a) => a.id === auftragId);
    if (!auftrag)
        return false;
    auftrag.mitarbeiterId = neuerMitarbeiterId;
    return true;
};
exports.setzeErsatzImAuftrag = setzeErsatzImAuftrag;
