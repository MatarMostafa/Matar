"use strict";
// src/Routes/adminKundenRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminKundenService_1 = require("../Services/adminKundenService");
const router = express_1.default.Router();
// GET /api/admin/kunden – alle Kunden anzeigen
router.get("/kunden", (req, res) => {
    const kunden = (0, adminKundenService_1.getAlleKunden)();
    res.json(kunden);
});
// POST /api/admin/kunden – neuen Kunden anlegen
router.post("/kunden", (req, res) => {
    const { hauptEmail } = req.body;
    if (!hauptEmail)
        return res.status(400).json({ message: "Email erforderlich" });
    const neuerKunde = (0, adminKundenService_1.addKunde)(hauptEmail);
    res.status(201).json(neuerKunde);
});
// POST /api/admin/kunden/:id/unteraccount – Unteraccount hinzufügen
router.post("/kunden/:id/unteraccount", (req, res) => {
    const kundeId = parseInt(req.params.id);
    const { email, passwort } = req.body;
    const neuerUA = (0, adminKundenService_1.addUnteraccount)(kundeId, email, passwort);
    if (neuerUA) {
        res.status(201).json(neuerUA);
    }
    else {
        res.status(404).json({ message: "Kunde nicht gefunden" });
    }
});
// DELETE /api/admin/kunden/:kundeId/unteraccount/:unteraccountId
router.delete("/kunden/:kundeId/unteraccount/:unteraccountId", (req, res) => {
    const kundeId = parseInt(req.params.kundeId);
    const unteraccountId = parseInt(req.params.unteraccountId);
    const success = (0, adminKundenService_1.deleteUnteraccount)(kundeId, unteraccountId);
    if (success) {
        res.status(200).json({ message: "Unteraccount gelöscht" });
    }
    else {
        res.status(404).json({ message: "Nicht gefunden" });
    }
});
exports.default = router;
