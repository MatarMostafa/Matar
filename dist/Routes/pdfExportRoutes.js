"use strict";
// src/Routes/pdfExportRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pdfExportService_1 = require("../Services/pdfExportService");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// Beispiel-Dummy: Exportiere PDF für Auftrag mit ID 1
router.get("/auftrag/:id", (req, res) => {
    const auftrag = {
        id: req.params.id,
        kunde: "Beispiel GmbH",
        datum: new Date().toISOString().slice(0, 10),
        beschreibung: "Reinigung Auftrag für Filiale X",
        status: "abgeschlossen"
    };
    const filename = (0, pdfExportService_1.generateAuftragPDF)(auftrag);
    const filepath = path_1.default.join(__dirname, "../../exports", filename);
    if (fs_1.default.existsSync(filepath)) {
        res.download(filepath);
    }
    else {
        res.status(404).json({ message: "PDF nicht gefunden" });
    }
});
exports.default = router;
