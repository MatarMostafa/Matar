"use strict";
// src/Routes/urlaubRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const urlaubController_1 = require("../Controllers/urlaubController");
const router = express_1.default.Router();
// POST /api/urlaub
router.post("/", urlaubController_1.stelleUrlaubsantrag);
// GET /api/urlaub
router.get("/", urlaubController_1.getAlleUrlaubsantraege);
// PUT /api/urlaub/genehmigen/:id
router.put("/genehmigen/:id", urlaubController_1.genehmigeUrlaub);
// PUT /api/urlaub/ablehnen/:id
router.put("/ablehnen/:id", urlaubController_1.lehneUrlaubAb);
exports.default = router;
const urlaubController_2 = require("../Controllers/urlaubController");
const router = express_1.default.Router();
// Alle Urlaubsanträge abrufen
router.get("/", urlaubController_2.getUrlaube);
// Urlaub beantragen
router.post("/", urlaubController_2.beantrageUrlaub);
// Urlaub genehmigen
router.patch("/:id/genehmigen", urlaubController_1.genehmigeUrlaub);
// Urlaub ablehnen
router.patch("/:id/ablehnen", urlaubController_1.lehneUrlaubAb);
exports.default = router;
const urlaube_1 = require("../data/urlaube");
const router = express_1.default.Router();
// Alle Urlaube abrufen
router.get("/", (_req, res) => {
    res.json(urlaube_1.urlaube);
});
// Urlaub beantragen
router.post("/", (req, res) => {
    const { mitarbeiterId, von, bis, grund } = req.body;
    if (!mitarbeiterId || !von || !bis) {
        return res.status(400).json({ message: "Pflichtfelder fehlen." });
    }
    const neuerUrlaub = {
        id: urlaube_1.urlaube.length + 1,
        mitarbeiterId,
        von,
        bis,
        grund,
        status: "beantragt",
    };
    urlaube_1.urlaube.push(neuerUrlaub);
    res.status(201).json(neuerUrlaub);
});
// Urlaub aktualisieren (z. B. Status ändern)
router.put("/:id", (req, res) => {
    const urlaubId = parseInt(req.params.id);
    const index = urlaube_1.urlaube.findIndex((u) => u.id === urlaubId);
    if (index === -1) {
        return res.status(404).json({ message: "Urlaub nicht gefunden." });
    }
    urlaube_1.urlaube[index] = { ...urlaube_1.urlaube[index], ...req.body };
    res.json(urlaube_1.urlaube[index]);
});
// Urlaub löschen
router.delete("/:id", (req, res) => {
    const urlaubId = parseInt(req.params.id);
    const index = urlaube_1.urlaube.findIndex((u) => u.id === urlaubId);
    if (index === -1) {
        return res.status(404).json({ message: "Urlaub nicht gefunden." });
    }
    urlaube_1.urlaube.splice(index, 1);
    res.status(204).send();
});
exports.default = router;
