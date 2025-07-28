"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.uploadFile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadDir = path_1.default.join(__dirname, "../../uploads");
const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Keine Datei hochgeladen" });
    }
    res.status(200).json({ message: "Datei erfolgreich hochgeladen", filename: req.file.filename });
};
exports.uploadFile = uploadFile;
const downloadFile = (req, res) => {
    const filename = req.params.filename;
    const filepath = path_1.default.join(uploadDir, filename);
    if (!fs_1.default.existsSync(filepath)) {
        return res.status(404).json({ message: "Datei nicht gefunden" });
    }
    res.download(filepath);
};
exports.downloadFile = downloadFile;
