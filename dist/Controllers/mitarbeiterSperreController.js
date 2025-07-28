"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entsperren = exports.addSperre = exports.getSperren = exports.holeSperren = exports.erstelleSperre = void 0;
const mitarbeiterSperren_1 = require("../data/mitarbeiterSperren");
let nextSperreId = 1;
const erstelleSperre = (req, res) => {
    const { mitarbeiterId, grund, von, bis } = req.body;
    if (!mitarbeiterId || !grund || !von || !bis) {
        return res.status(400).json({ message: "Alle Felder müssen ausgefüllt werden" });
    }
    const neueSperre = {
        id: nextSperreId++,
        mitarbeiterId,
        grund,
        von,
        bis,
    };
    mitarbeiterSperren_1.mitarbeiterSperren.push(neueSperre);
    return res.status(201).json({ message: "Sperre eingetragen", sperre: neueSperre });
};
exports.erstelleSperre = erstelleSperre;
const holeSperren = (_req, res) => {
    res.json(mitarbeiterSperren_1.mitarbeiterSperren);
};
exports.holeSperren = holeSperren;
const mitarbeitersperren_1 = require("../data/mitarbeitersperren");
// Alle Sperren abrufen
const getSperren = (_req, res) => {
    res.json(mitarbeitersperren_1.mitarbeitersperren);
};
exports.getSperren = getSperren;
// Neue Sperre hinzufügen
const addSperre = (req, res) => {
    const { mitarbeiterId, grund, von, bis } = req.body;
    const neueSperre = {
        id: mitarbeitersperren_1.mitarbeitersperren.length + 1,
        mitarbeiterId,
        grund,
        von,
        bis,
        aktiv: true,
    };
    mitarbeitersperren_1.mitarbeitersperren.push(neueSperre);
    res.status(201).json({ message: "Mitarbeiter wurde gesperrt", sperre: neueSperre });
};
exports.addSperre = addSperre;
// Sperre deaktivieren
const entsperren = (req, res) => {
    const id = parseInt(req.params.id);
    const sperre = mitarbeitersperren_1.mitarbeitersperren.find((s) => s.id === id);
    if (!sperre) {
        return res.status(404).json({ message: "Sperre nicht gefunden" });
    }
    sperre.aktiv = false;
    res.json({ message: "Mitarbeiter entsperrt", sperre });
};
exports.entsperren = entsperren;
