"use strict";
// src/Controllers/urlaubController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lehneUrlaubAb = exports.genehmigeUrlaub = exports.getAlleUrlaubsantraege = exports.stelleUrlaubsantrag = void 0;
const urlaubsantraege_1 = require("../data/urlaubsantraege");
// POST /api/urlaub
const stelleUrlaubsantrag = (req, res) => {
    const { mitarbeiterId, von, bis, grund } = req.body;
    if (!mitarbeiterId || !von || !bis || !grund) {
        return res.status(400).json({ message: "Fehlende Felder im Antrag." });
    }
    const neuerAntrag = {
        id: urlaubsantraege_1.urlaubsantraege.length + 1,
        mitarbeiterId,
        von,
        bis,
        grund,
        status: "offen",
    };
    urlaubsantraege_1.urlaubsantraege.push(neuerAntrag);
    res.status(201).json({ message: "Urlaubsantrag gestellt.", antrag: neuerAntrag });
};
exports.stelleUrlaubsantrag = stelleUrlaubsantrag;
// GET /api/urlaub
const getAlleUrlaubsantraege = (_req, res) => {
    res.json(urlaubsantraege_1.urlaubsantraege);
};
exports.getAlleUrlaubsantraege = getAlleUrlaubsantraege;
// PUT /api/urlaub/genehmigen/:id
const genehmigeUrlaub = (req, res) => {
    const id = parseInt(req.params.id);
    const antrag = urlaubsantraege_1.urlaubsantraege.find((a) => a.id === id);
    if (!antrag) {
        return res.status(404).json({ message: "Antrag nicht gefunden." });
    }
    antrag.status = "genehmigt";
    res.json({ message: "Urlaub genehmigt.", antrag });
};
exports.genehmigeUrlaub = genehmigeUrlaub;
// PUT /api/urlaub/ablehnen/:id
const lehneUrlaubAb = (req, res) => {
    const id = parseInt(req.params.id);
    const antrag = urlaubsantraege_1.urlaubsantraege.find((a) => a.id === id);
    if (!antrag) {
        return res.status(404).json({ message: "Antrag nicht gefunden." });
    }
    antrag.status = "abgelehnt";
    res.json({ message: "Urlaub abgelehnt.", antrag });
};
exports.lehneUrlaubAb = lehneUrlaubAb;
// src/Routes/urlaubRoutes.ts
const express_1 = __importDefault(require("express"));
const urlaubController_1 = require("../Controllers/urlaubController");
const router = express_1.default.Router();
// Alle Urlaubsanträge abrufen
router.get("/", urlaubController_1.getUrlaube);
// Urlaub beantragen
router.post("/", urlaubController_1.beantrageUrlaub);
// Urlaub genehmigen
router.patch("/:id/genehmigen", exports.genehmigeUrlaub);
// Urlaub ablehnen
router.patch("/:id/ablehnen", exports.lehneUrlaubAb);
exports.default = router;
