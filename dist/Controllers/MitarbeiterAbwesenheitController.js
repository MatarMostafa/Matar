"use strict";
// src/Controllers/MitarbeiterAbwesenheitController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.krankmelden = exports.urlaubBeantragen = void 0;
const mitarbeiter_1 = require("../data/mitarbeiter");
const auftraege_1 = require("../data/auftraege");
// Urlaub beantragen
const urlaubBeantragen = (req, res) => {
    const mitarbeiterId = req.user.id;
    const { von, bis, kommentar } = req.body;
    const mitarbeiterEintrag = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mitarbeiterEintrag) {
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    }
    mitarbeiterEintrag.urlaub = mitarbeiterEintrag.urlaub || [];
    mitarbeiterEintrag.urlaub.push({ von, bis, kommentar });
    res.json({ message: "Urlaub beantragt", urlaub: mitarbeiterEintrag.urlaub });
};
exports.urlaubBeantragen = urlaubBeantragen;
// Krankmeldung
const krankmelden = (req, res) => {
    const mitarbeiterId = req.user.id;
    const { datum, grund } = req.body;
    const mitarbeiterEintrag = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mitarbeiterEintrag) {
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    }
    mitarbeiterEintrag.krankmeldungen = mitarbeiterEintrag.krankmeldungen || [];
    mitarbeiterEintrag.krankmeldungen.push({ datum, grund });
    // Bestehende Aufträge prüfen und Mitarbeiter austragen
    const betroffeneAuftraege = auftraege_1.auftraege.filter((a) => a.eingeteilteMitarbeiter?.some((e) => e.mitarbeiterId === mitarbeiterId));
    for (const auftrag of betroffeneAuftraege) {
        const slot = auftrag.eingeteilteMitarbeiter.find((e) => e.mitarbeiterId === mitarbeiterId);
        if (slot) {
            slot.status = "krank";
            slot.begruendung = grund;
        }
    }
    res.json({
        message: "Krankmeldung erfasst",
        krankmeldungen: mitarbeiterEintrag.krankmeldungen,
    });
};
exports.krankmelden = krankmelden;
