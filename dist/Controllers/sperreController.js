"use strict";
// src/Controllers/sperreController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.entsperren = exports.sperren = exports.getSperrstatus = void 0;
const gesperrteMitarbeiter_1 = require("../data/gesperrteMitarbeiter");
const mitarbeiter_1 = require("../data/mitarbeiter");
const getSperrstatus = (req, res) => {
    const statusListe = mitarbeiter_1.mitarbeiter.map((m) => ({
        mitarbeiterId: m.id,
        name: m.name,
        gesperrt: gesperrteMitarbeiter_1.gesperrteMitarbeiter.includes(m.id),
    }));
    res.json(statusListe);
};
exports.getSperrstatus = getSperrstatus;
const sperren = (req, res) => {
    const { mitarbeiterId } = req.body;
    if (!gesperrteMitarbeiter_1.gesperrteMitarbeiter.includes(mitarbeiterId)) {
        gesperrteMitarbeiter_1.gesperrteMitarbeiter.push(mitarbeiterId);
    }
    res.json({ message: "Mitarbeiter gesperrt", mitarbeiterId });
};
exports.sperren = sperren;
const entsperren = (req, res) => {
    const { mitarbeiterId } = req.body;
    const index = gesperrteMitarbeiter_1.gesperrteMitarbeiter.indexOf(mitarbeiterId);
    if (index > -1) {
        gesperrteMitarbeiter_1.gesperrteMitarbeiter.splice(index, 1);
    }
    res.json({ message: "Mitarbeiter entsperrt", mitarbeiterId });
};
exports.entsperren = entsperren;
