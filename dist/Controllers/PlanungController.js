"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.automatischePlanung = void 0;
const auftraege_1 = require("../data/auftraege");
const mitarbeiter_1 = require("../data/mitarbeiter");
// Planungslogik – nach Priorität
const automatischePlanung = (req, res) => {
    const jetzt = new Date();
    const unbesetzte = auftraege_1.auftraege.filter(a => a.status === "offen" &&
        (!a.eingeteilteMitarbeiter || a.eingeteilteMitarbeiter.length === 0));
    for (const auftrag of unbesetzte) {
        const passende = mitarbeiter_1.mitarbeiter
            .filter(m => m.status === "aktiv" && !m.urlaub && !m.krank)
            .sort((a, b) => a.prioritaet - b.prioritaet)
            .slice(0, auftrag.anzahlMitarbeiter || 1);
        auftrag.eingeteilteMitarbeiter = passende.map(m => ({
            mitarbeiterId: m.id,
            status: "zugewiesen",
        }));
        auftrag.status = "zugewiesen";
    }
    res.json({ message: "Automatische Planung durchgeführt", auftraege: auftraege_1.auftraege });
};
exports.automatischePlanung = automatischePlanung;
