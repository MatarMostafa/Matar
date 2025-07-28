"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stundenUebersicht = void 0;
const auftraege_1 = require("../data/auftraege");
const stundenUebersicht = (req, res) => {
    const zusammenfassung = {};
    auftraege_1.auftraege.forEach(a => {
        if (!a.eingeteilteMitarbeiter)
            return;
        a.eingeteilteMitarbeiter.forEach(e => {
            zusammenfassung[e.mitarbeiterId] =
                (zusammenfassung[e.mitarbeiterId] || 0) + (a.dauer || 0);
        });
    });
    res.json({ zusammenfassung });
};
exports.stundenUebersicht = stundenUebersicht;
