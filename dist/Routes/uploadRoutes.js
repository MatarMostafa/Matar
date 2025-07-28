"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const verifyToken_1 = require("../Middleware/verifyToken");
const router = express_1.default.Router();
// Speicherort für hochgeladene Dateien
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/";
        if (!fs_1.default.existsSync(dir))
            fs_1.default.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({ storage });
// Datei hochladen (nur mit Token erlaubt)
router.post("/upload", verifyToken_1.verifyToken, upload.single("file"), (req, res) => {
    if (!req.file)
        return res.status(400).json({ error: "Keine Datei hochgeladen" });
    res.json({
        message: "Datei erfolgreich hochgeladen",
        filename: req.file.filename,
        url: `/uploads/${req.file.filename}`,
    });
});
// Datei herunterladen (öffentlich erreichbar)
router.get("/download/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path_1.default.join(__dirname, "../../uploads", filename);
    if (!fs_1.default.existsSync(filePath)) {
        return res.status(404).json({ error: "Datei nicht gefunden" });
    }
    res.download(filePath);
});
exports.default = router;
