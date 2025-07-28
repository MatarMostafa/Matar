"use strict";
// src/Routes/einsatzDokuRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// Speicherort + Dateiname
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        const dir = path_1.default.join(__dirname, "../../uploads/einsaetze");
        if (!fs_1.default.existsSync(dir))
            fs_1.default.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (_req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({ storage });
// POST /api/einsaetze/upload/:auftragId
router.post("/upload/:auftragId", upload.single("file"), (req, res) => {
    const auftragId = req.params.auftragId;
    if (!req.file) {
        return res.status(400).json({ message: "Keine Datei empfangen" });
    }
    const fileUrl = `/uploads/einsaetze/${req.file.filename}`;
    // Hier könnte man auch Datenbanklogik einbauen, um die Datei mit einem Auftrag zu verknüpfen
    res.status(201).json({
        message: "Einsatz-Dokument gespeichert",
        auftragId,
        fileUrl,
    });
});
exports.default = router;
