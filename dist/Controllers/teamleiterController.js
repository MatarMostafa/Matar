"use strict";
// src/Controllers/teamleiterController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.auftragEskalieren = exports.auftragFreigeben = exports.rueckmeldungGeben = exports.getAuftraegeFuerTeamleiter = exports.weiseMitarbeiterZu = exports.getAlleTeamleiter = void 0;
const mitarbeiter_1 = require("../data/mitarbeiter");
const getAlleTeamleiter = (_req, res) => {
    const teamleiter = mitarbeiter_1.mitarbeiter.filter(m => m.role === "teamleiter");
    res.json(teamleiter);
};
exports.getAlleTeamleiter = getAlleTeamleiter;
const weiseMitarbeiterZu = (req, res) => {
    const { mitarbeiterId, teamleiterId } = req.body;
    const mitarb = mitarbeiter_1.mitarbeiter.find(m => m.id === mitarbeiterId);
    const leiter = mitarbeiter_1.mitarbeiter.find(t => t.id === teamleiterId && t.role === "teamleiter");
    if (!mitarb || !leiter) {
        return res.status(404).json({ message: "Teamleiter oder Mitarbeiter nicht gefunden" });
    }
    mitarb.teamleiterId = teamleiterId;
    res.json({ message: "Mitarbeiter erfolgreich zugewiesen", mitarbeiter: mitarb });
};
exports.weiseMitarbeiterZu = weiseMitarbeiterZu;
const auftraege_1 = require("../data/auftraege");
// Aufträge für Teamleiter abrufen
const getAuftraegeFuerTeamleiter = (req, res) => {
    const teamleiterId = parseInt(req.params.teamleiterId);
    const zugewiesene = auftraege_1.auftraege.filter(a => a.teamleiterId === teamleiterId);
    res.json(zugewiesene);
};
exports.getAuftraegeFuerTeamleiter = getAuftraegeFuerTeamleiter;
// Rückmeldung zu einem Auftrag geben
const rueckmeldungGeben = (req, res) => {
    const auftragId = parseInt(req.params.auftragId);
    const { kommentar } = req.body;
    const auftrag = auftraege_1.auftraege.find(a => a.id === auftragId);
    if (!auftrag) {
        return res.status(404).json({ message: "Auftrag nicht gefunden" });
    }
    auftrag.teamleiterRueckmeldung = kommentar;
    res.json({ message: "Rückmeldung gespeichert", auftrag });
};
exports.rueckmeldungGeben = rueckmeldungGeben;
// Auftrag freigeben
const auftragFreigeben = (req, res) => {
    const auftragId = parseInt(req.params.auftragId);
    const auftrag = auftraege_1.auftraege.find(a => a.id === auftragId);
    if (!auftrag) {
        return res.status(404).json({ message: "Auftrag nicht gefunden" });
    }
    auftrag.status = "freigegeben";
    res.json({ message: "Auftrag freigegeben", auftrag });
};
exports.auftragFreigeben = auftragFreigeben;
// Auftrag eskalieren
const auftragEskalieren = (req, res) => {
    const auftragId = parseInt(req.params.auftragId);
    const auftrag = auftraege_1.auftraege.find(a => a.id === auftragId);
    if (!auftrag) {
        return res.status(404).json({ message: "Auftrag nicht gefunden" });
    }
    auftrag.status = "eskaliert";
    res.json({ message: "Auftrag wurde eskaliert", auftrag });
};
exports.auftragEskalieren = auftragEskalieren;
