"use strict";
// src/Routes/fallbackRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fallbackSystem_1 = require("../Utils/fallbackSystem");
const router = express_1.default.Router();
// Manuell Fallback anstoßen
router.post("/", (req, res) => {
    const { datum } = req.body;
    if (!datum) {
        return res.status(400).json({ message: "Datum erforderlich" });
    }
    const ersetzt = (0, fallbackSystem_1.fallbackZuweisung)(datum);
    return res.json({ message: `✅ ${ersetzt} Ersatz-Zuweisungen durchgeführt.` });
});
exports.default = router;
const fallbackService_1 = require("../Services/fallbackService");
const router = express_1.default.Router();
// POST /api/fallback/ausfall
router.post("/ausfall", fallbackService_1.handleMitarbeiterAusfall);
exports.default = router;
const fallbackService_2 = require("../Services/fallbackService");
const router = express_1.default.Router();
// POST /api/fallback/ersetzen
router.post("/ersetzen", (req, res) => {
    const { auftragId, mitarbeiterId, datum, qualifikation } = req.body;
    if (!auftragId || !mitarbeiterId || !datum || !qualifikation) {
        return res.status(400).json({ message: "Alle Felder sind erforderlich" });
    }
    const ersatzId = (0, fallbackService_2.findeErsatzMitarbeiter)(mitarbeiterId, datum, qualifikation);
    if (!ersatzId) {
        return res.status(404).json({ message: "Kein Ersatzmitarbeiter gefunden" });
    }
    const gesetzt = (0, fallbackService_2.setzeErsatzImAuftrag)(auftragId, ersatzId);
    if (!gesetzt) {
        return res.status(500).json({ message: "Auftrag nicht gefunden oder Fehler beim Ersetzen" });
    }
    res.status(200).json({
        message: "Ersatzmitarbeiter erfolgreich zugewiesen",
        neuerMitarbeiterId: ersatzId,
    });
});
exports.default = router;
