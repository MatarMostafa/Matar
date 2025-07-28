"use strict";
// src/Routes/krankRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const krankService_1 = require("../Services/krankService");
const benachrichtigungService_1 = require("../Services/benachrichtigungService");
const router = express_1.default.Router();
// POST /api/krank
router.post("/", (req, res) => {
    const { mitarbeiterId, von, bis, grund } = req.body;
    if (!mitarbeiterId || !von || !bis || !grund) {
        return res.status(400).json({ message: "Alle Felder sind erforderlich" });
    }
    const meldung = (0, krankService_1.krankmelden)(mitarbeiterId, von, bis, grund);
    // ❗ Automatisch Benachrichtigung erzeugen
    (0, benachrichtigungService_1.sendeBenachrichtigung)(mitarbeiterId, "Krankmeldung registriert", `Deine Krankmeldung vom ${von} bis ${bis} wurde erfasst.`);
    res.status(201).json(meldung);
});
// GET /api/krank/:mitarbeiterId
router.get("/:mitarbeiterId", (req, res) => {
    const id = parseInt(req.params.mitarbeiterId);
    const meldungen = (0, krankService_1.getKrankmeldungen)(id);
    res.json(meldungen);
});
exports.default = router;
