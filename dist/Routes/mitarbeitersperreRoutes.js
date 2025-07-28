"use strict";
// src/Routes/mitarbeitersperreRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mitarbeitersperreService_1 = require("../Services/mitarbeitersperreService");
const router = express_1.default.Router();
// Neue Mitarbeitersperre anlegen
router.post("/", (req, res) => {
    const { mitarbeiterId, startDatum, endDatum, grund } = req.body;
    if (!mitarbeiterId || !startDatum || !endDatum || !grund) {
        return res.status(400).json({ message: "Bitte alle Felder angeben." });
    }
    const neueSperre = (0, mitarbeitersperreService_1.sperreErstellen)({ mitarbeiterId, startDatum, endDatum, grund });
    res.status(201).json(neueSperre);
});
// Alle Sperren abrufen
router.get("/", (req, res) => {
    res.json((0, mitarbeitersperreService_1.alleSperren)());
});
// Einzelne Sperre nach ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const sperre = (0, mitarbeitersperreService_1.sperreNachId)(id);
    if (!sperre) {
        return res.status(404).json({ message: "Sperre nicht gefunden." });
    }
    res.json(sperre);
});
// Sperre aktualisieren
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const aktualisiert = (0, mitarbeitersperreService_1.sperreAktualisieren)(id, req.body);
    if (!aktualisiert) {
        return res.status(404).json({ message: "Sperre nicht gefunden." });
    }
    res.json(aktualisiert);
});
// Sperre löschen
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const geloescht = (0, mitarbeitersperreService_1.sperreLoeschen)(id);
    if (!geloescht) {
        return res.status(404).json({ message: "Sperre nicht gefunden." });
    }
    res.json({ message: "Sperre gelöscht." });
});
exports.default = router;
const mitarbeitersperreService_2 = require("../Services/mitarbeitersperreService");
const router = express_1.default.Router();
// GET /api/sperren
router.get("/", (_req, res) => {
    const alleSperren = (0, mitarbeitersperreService_2.getAlleSperren)();
    res.json(alleSperren);
});
// POST /api/sperren
router.post("/", (req, res) => {
    const { mitarbeiterId, grund, von, bis } = req.body;
    if (!mitarbeiterId || !grund || !von || !bis) {
        return res.status(400).json({ message: "Alle Felder sind erforderlich" });
    }
    const neueSperre = (0, mitarbeitersperreService_2.erstelleSperre)({ mitarbeiterId, grund, von, bis });
    res.status(201).json(neueSperre);
});
exports.default = router;
