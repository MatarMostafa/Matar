"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.holeBewertungen = exports.erstelleBewertung = exports.getBewertungen = exports.setBewertung = exports.mitarbeiterWiederFreigeben = exports.getBewertungenFuerKunde = exports.getBewertungenFuerAdmin = exports.bewerteMitarbeiter = void 0;
const bewertungen_1 = require("../data/bewertungen");
const sperrliste_1 = require("../data/sperrliste");
// Mitarbeiter bewerten (Ampelprinzip)
const bewerteMitarbeiter = (req, res) => {
    const { auftragId, mitarbeiterId, kundeId, bewertung, kommentar } = req.body;
    if (!["grün", "gelb", "rot"].includes(bewertung)) {
        return res.status(400).json({ message: "Ungültige Bewertung" });
    }
    if (bewertung === "rot" && (!kommentar || kommentar.trim() === "")) {
        return res.status(400).json({ message: "Kommentar ist bei roter Bewertung erforderlich" });
    }
    bewertungen_1.bewertungen.push({
        auftragId,
        mitarbeiterId,
        kundeId,
        bewertung,
        kommentar: kommentar || null,
        datum: new Date(),
    });
    if (bewertung === "rot") {
        sperrliste_1.sperrliste.push({
            mitarbeiterId,
            kundeId,
            kommentar,
            gesperrtAm: new Date(),
        });
    }
    res.status(200).json({ message: "Bewertung gespeichert" });
};
exports.bewerteMitarbeiter = bewerteMitarbeiter;
// Admin: Alle Bewertungen sehen
const getBewertungenFuerAdmin = (_req, res) => {
    res.status(200).json(bewertungen_1.bewertungen);
};
exports.getBewertungenFuerAdmin = getBewertungenFuerAdmin;
// Kunde: Eigene Bewertungen sehen
const getBewertungenFuerKunde = (req, res) => {
    const kundeId = Number(req.query.kundeId);
    const eigene = bewertungen_1.bewertungen.filter(b => b.kundeId === kundeId);
    res.status(200).json(eigene);
};
exports.getBewertungenFuerKunde = getBewertungenFuerKunde;
// Admin/Kunde gibt Mitarbeiter wieder frei
const mitarbeiterWiederFreigeben = (req, res) => {
    const { mitarbeiterId, kundeId } = req.body;
    const index = sperrliste_1.sperrliste.findIndex((s) => s.mitarbeiterId === mitarbeiterId && s.kundeId === kundeId);
    if (index !== -1) {
        sperrliste_1.sperrliste.splice(index, 1);
        return res.status(200).json({ message: "Mitarbeiter wurde freigegeben" });
    }
    res.status(404).json({ message: "Eintrag nicht gefunden" });
};
exports.mitarbeiterWiederFreigeben = mitarbeiterWiederFreigeben;
// Bewertung setzen oder aktualisieren
const setBewertung = (req, res) => {
    const { mitarbeiterId, status, grund } = req.body;
    if (!mitarbeiterId || !status) {
        return res.status(400).json({ message: "Mitarbeiter-ID und Status erforderlich" });
    }
    const existing = bewertungen_1.bewertungen.find(b => b.mitarbeiterId === mitarbeiterId);
    if (existing) {
        existing.status = status;
        existing.grund = grund;
    }
    else {
        const neueBewertung = { mitarbeiterId, status, grund };
        bewertungen_1.bewertungen.push(neueBewertung);
    }
    res.status(200).json({ message: "Bewertung gespeichert", mitarbeiterId, status });
};
exports.setBewertung = setBewertung;
// Alle Bewertungen abrufen
const getBewertungen = (_req, res) => {
    res.json(bewertungen_1.bewertungen);
};
exports.getBewertungen = getBewertungen;
let nextBewertungId = 1;
const erstelleBewertung = (req, res) => {
    const { mitarbeiterId, auftragId, status, bemerkung } = req.body;
    if (!["grün", "gelb", "rot"].includes(status)) {
        return res.status(400).json({ message: "Ungültiger Status" });
    }
    const neueBewertung = {
        id: nextBewertungId++,
        mitarbeiterId,
        auftragId,
        status,
        bemerkung,
        erstelltAm: new Date(),
    };
    bewertungen_1.bewertungen.push(neueBewertung);
    return res.status(201).json({ message: "Bewertung gespeichert", bewertung: neueBewertung });
};
exports.erstelleBewertung = erstelleBewertung;
const holeBewertungen = (req, res) => {
    res.json(bewertungen_1.bewertungen);
};
exports.holeBewertungen = holeBewertungen;
