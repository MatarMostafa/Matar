"use strict";
// src/Routes/kundenRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const kundenService_1 = require("../Services/kundenService");
const router = express_1.default.Router();
// GET /api/kunden
router.get("/", (_req, res) => {
    res.json((0, kundenService_1.getAlleKunden)());
});
// POST /api/kunden
router.post("/", (req, res) => {
    const { firmenname, email } = req.body;
    if (!firmenname || !email) {
        return res.status(400).json({ message: "Firmenname und E-Mail sind erforderlich" });
    }
    const kunde = (0, kundenService_1.erstelleKunde)(firmenname, email);
    res.status(201).json(kunde);
});
// POST /api/kunden/:kundeId/unteraccount
router.post("/:kundeId/unteraccount", (req, res) => {
    const kundeId = parseInt(req.params.kundeId);
    const { name, email } = req.body;
    const unteraccount = (0, kundenService_1.fuegeUnteraccountHinzu)(kundeId, name, email);
    if (!unteraccount) {
        return res.status(404).json({ message: "Kunde nicht gefunden" });
    }
    res.status(201).json(unteraccount);
});
exports.default = router;
const kundenService_2 = require("../Services/kundenService");
const router = express_1.default.Router();
// POST /api/kunden/login-unteraccount
router.post("/login-unteraccount", (req, res) => {
    const { email, passwort } = req.body;
    const daten = (0, kundenService_2.findeUnteraccount)(email, passwort);
    if (daten) {
        return res.status(200).json({
            message: "Login erfolgreich",
            kundeId: daten.kundeId,
            unteraccount: daten.unteraccount,
        });
    }
    else {
        return res.status(401).json({ message: "Login fehlgeschlagen" });
    }
});
// GET /api/kunden/:kundeId/unteraccounts
router.get("/:kundeId/unteraccounts", (req, res) => {
    const kundeId = parseInt(req.params.kundeId);
    const liste = (0, kundenService_2.getUnteraccountsFuerKunde)(kundeId);
    res.json(liste);
});
exports.default = router;
