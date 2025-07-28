"use strict";
// src/Routes/zuweisungRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zuweisungsService_1 = require("../Services/zuweisungsService");
const router = express_1.default.Router();
// GET /api/zuweisung/vorschlaege/:auftragId
router.get("/vorschlaege/:auftragId", (req, res) => {
    const auftragId = parseInt(req.params.auftragId);
    if (isNaN(auftragId)) {
        return res.status(400).json({ message: "Ungültige Auftrags-ID" });
    }
    const mitarbeiterIds = (0, zuweisungsService_1.findePassendeMitarbeiter)(auftragId);
    res.json({ mitarbeiter: mitarbeiterIds });
});
exports.default = router;
const auftraege_1 = require("../data/auftraege");
const users_1 = require("../data/users");
const router = express_1.default.Router();
// PUT /api/zuweisung/:auftragId
router.put("/:auftragId", (req, res) => {
    const auftragId = parseInt(req.params.auftragId);
    const { mitarbeiterIds } = req.body;
    const auftrag = auftraege_1.auftraege.find((a) => a.id === auftragId);
    if (!auftrag) {
        return res.status(404).json({ message: "Auftrag nicht gefunden" });
    }
    if (!Array.isArray(mitarbeiterIds)) {
        return res.status(400).json({ message: "mitarbeiterIds muss ein Array sein" });
    }
    // Überprüfen, ob die Mitarbeiter existieren
    const ungültigeIds = mitarbeiterIds.filter((id) => !users_1.users.find((u) => u.id === id && u.role === "mitarbeiter"));
    if (ungültigeIds.length > 0) {
        return res.status(400).json({
            message: `Ungültige Mitarbeiter-IDs: ${ungültigeIds.join(", ")}`,
        });
    }
    auftrag.mitarbeiterIds = mitarbeiterIds;
    return res.json({ message: "Mitarbeiter erfolgreich zugewiesen", auftrag });
});
exports.default = router;
