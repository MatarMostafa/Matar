"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auftragService_1 = require("../Services/auftragService");
const router = express_1.default.Router();
// GET /auftraege
router.get('/', (req, res) => {
    const result = (0, auftragService_1.holeAlleAuftraege)();
    res.json(result);
});
// GET /auftraege/:id
router.get('/:id', (req, res) => {
    const auftrag = (0, auftragService_1.getAuftragById)(req.params.id);
    if (auftrag) {
        res.json(auftrag);
    }
    else {
        res.status(404).json({ error: 'Auftrag nicht gefunden' });
    }
});
// POST /auftraege
router.post('/', (req, res) => {
    const neuerAuftrag = (0, auftragService_1.createAuftrag)(req.body);
    res.status(201).json(neuerAuftrag);
});
// PUT /auftraege/:id
router.put('/:id', (req, res) => {
    const aktualisiert = (0, auftragService_1.updateAuftrag)(req.params.id, req.body);
    if (aktualisiert) {
        res.json(aktualisiert);
    }
    else {
        res.status(404).json({ error: 'Auftrag nicht gefunden' });
    }
});
// DELETE /auftraege/:id
router.delete('/:id', (req, res) => {
    const success = (0, auftragService_1.deleteAuftrag)(req.params.id);
    if (success) {
        res.json({ message: 'Auftrag gelöscht' });
    }
    else {
        res.status(404).json({ error: 'Auftrag nicht gefunden' });
    }
});
exports.default = router;
