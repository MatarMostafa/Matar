"use strict";
// src/Controllers/abwesenheitController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlleAbwesenheiten = void 0;
const urlaub_1 = require("../data/urlaub");
const krank_1 = require("../data/krank");
const getAlleAbwesenheiten = (req, res) => {
    const abwesenheiten = [...urlaub_1.urlaub, ...krank_1.krankmeldungen];
    // Optional sortiert nach Mitarbeiter und Datum
    abwesenheiten.sort((a, b) => {
        if (a.mitarbeiterId === b.mitarbeiterId) {
            return new Date(a.von).getTime() - new Date(b.von).getTime();
        }
        return a.mitarbeiterId - b.mitarbeiterId;
    });
    res.json(abwesenheiten);
};
exports.getAlleAbwesenheiten = getAlleAbwesenheiten;
