"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mitarbeiterSperreController_1 = require("../Controllers/mitarbeiterSperreController");
const router = express_1.default.Router();
router.post("/", mitarbeiterSperreController_1.erstelleSperre);
router.get("/", mitarbeiterSperreController_1.holeSperren);
exports.default = router;
const mitarbeitersperreController_1 = require("../Controllers/mitarbeitersperreController");
const router = express_1.default.Router();
router.get("/", mitarbeitersperreController_1.getSperren);
router.post("/", mitarbeitersperreController_1.addSperre);
router.put("/:id/entsperren", mitarbeitersperreController_1.entsperren);
exports.default = router;
const sperrungen_1 = require("../data/sperrungen");
const router = express_1.default.Router();
// ✅ Liste aller Sperrungen
router.get("/", (_req, res) => {
    res.json(sperrungen_1.sperrungen);
});
// 🔍 Sperrung für Mitarbeiter-ID
router.get("/:mitarbeiterId", (req, res) => {
    const id = parseInt(req.params.mitarbeiterId);
    const eintrag = sperrungen_1.sperrungen.find((s) => s.mitarbeiterId === id);
    if (!eintrag)
        return res.status(404).json({ message: "Keine Sperre gefunden" });
    res.json(eintrag);
});
// ➕ Neue Sperrung hinzufügen
router.post("/", (req, res) => {
    const { mitarbeiterId, grund, von, bis } = req.body;
    if (!mitarbeiterId || !grund || !von) {
        return res.status(400).json({ message: "Fehlende Felder" });
    }
    const bestehend = sperrungen_1.sperrungen.find((s) => s.mitarbeiterId === mitarbeiterId);
    if (bestehend)
        return res.status(409).json({ message: "Mitarbeiter bereits gesperrt" });
    const eintrag = {
        mitarbeiterId,
        grund,
        von,
        bis: bis || null,
    };
    sperrungen_1.sperrungen.push(eintrag);
    res.status(201).json({ message: "Sperrung gespeichert", sperrung: eintrag });
});
// ❌ Sperre aufheben
router.delete("/:mitarbeiterId", (req, res) => {
    const id = parseInt(req.params.mitarbeiterId);
    const index = sperrungen_1.sperrungen.findIndex((s) => s.mitarbeiterId === id);
    if (index === -1)
        return res.status(404).json({ message: "Sperrung nicht gefunden" });
    sperrungen_1.sperrungen.splice(index, 1);
    res.json({ message: "Sperre entfernt" });
});
exports.default = router;
