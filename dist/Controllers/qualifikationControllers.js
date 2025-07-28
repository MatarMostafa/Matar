"use strict";
// src/Controllers/qualifikationController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQualifikationenVonMitarbeiter = exports.setzeMitarbeiterQualifikationen = exports.erstelleQualifikation = exports.getAlleQualifikationen = void 0;
const qualifikationen_1 = require("../data/qualifikationen");
const mitarbeiter_1 = require("../data/mitarbeiter");
// Alle Qualifikationen abrufen
const getAlleQualifikationen = (req, res) => {
    res.json(qualifikationen_1.qualifikationen);
};
exports.getAlleQualifikationen = getAlleQualifikationen;
// Neue Qualifikation hinzufügen
const erstelleQualifikation = (req, res) => {
    const { bezeichnung } = req.body;
    if (!bezeichnung) {
        return res.status(400).json({ message: "Bezeichnung ist erforderlich" });
    }
    const neueQuali = {
        id: qualifikationen_1.qualifikationen.length + 1,
        bezeichnung,
    };
    qualifikationen_1.qualifikationen.push(neueQuali);
    res.status(201).json({ message: "Qualifikation hinzugefügt", qualifikation: neueQuali });
};
exports.erstelleQualifikation = erstelleQualifikation;
// Qualifikationen zuweisen
const setzeMitarbeiterQualifikationen = (req, res) => {
    const { mitarbeiterId, qualifikationenIds } = req.body;
    const mitarb = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mitarb) {
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    }
    mitarb.qualifikationen = qualifikationenIds;
    res.json({ message: "Qualifikationen aktualisiert", mitarbeiter: mitarb });
};
exports.setzeMitarbeiterQualifikationen = setzeMitarbeiterQualifikationen;
const mitarbeiterQualifikationen_1 = require("../data/mitarbeiterQualifikationen");
const getAlleQualifikationen = (_req, res) => {
    res.json(qualifikationen_1.qualifikationen);
};
exports.getAlleQualifikationen = getAlleQualifikationen;
const getQualifikationenVonMitarbeiter = (req, res) => {
    const mitarbeiterId = parseInt(req.params.id);
    const zugewiesene = mitarbeiterQualifikationen_1.mitarbeiterQualifikationen.filter(q => q.mitarbeiterId === mitarbeiterId);
    res.json(zugewiesene);
};
exports.getQualifikationenVonMitarbeiter = getQualifikationenVonMitarbeiter;
const getAlleQualifikationen = (_req, res) => {
    res.json(qualifikationen_1.qualifikationen);
};
exports.getAlleQualifikationen = getAlleQualifikationen;
