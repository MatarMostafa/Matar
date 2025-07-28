"use strict";
// src/Routes/einsatzNotizRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// Speicherort (JSON-Datei als Dummy-Datenbank)
const NOTIZ_DATEI = path_1.default.join(__dirname, "../../data/einsatznotizen.json");
// Hilfsfunktion: Datei laden
function ladeNotizen() {
    if (!fs_1.default.existsSync(NOTIZ_DATEI))
        return [];
    const data = fs_1.default.readFileSync(NOTIZ_DATEI, "utf-8");
    return JSON.parse(data);
}
// Hilfsfunktion: Datei speichern
function speichereNotizen(notizen) {
    fs_1.default.writeFileSync(NOTIZ_DATEI, JSON.stringify(notizen, null, 2));
}
// GET /api/einsatznotizen/:auftragId
router.get("/:auftragId", (req, res) => {
    const { auftragId } = req.params;
    const notizen = ladeNotizen().filter(n => n.auftragId === Number(auftragId));
    res.json(notizen);
});
// POST /api/einsatznotizen/:auftragId
router.post("/:auftragId", (req, res) => {
    const { auftragId } = req.params;
    const { text, autor } = req.body;
    if (!text || !autor) {
        return res.status(400).json({ message: "Text oder Autor fehlt" });
    }
    const neueNotiz = {
        id: Date.now(),
        auftragId: Number(auftragId),
        text,
        autor,
        erstelltAm: new Date().toISOString(),
    };
    const notizen = ladeNotizen();
    notizen.push(neueNotiz);
    speichereNotizen(notizen);
    res.status(201).json({ message: "Notiz gespeichert", notiz: neueNotiz });
});
exports.default = router;
