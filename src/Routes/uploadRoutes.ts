import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { verifyToken } from "../Middleware/verifyToken";

const router = express.Router();

// Speicherort für hochgeladene Dateien
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Datei hochladen (nur mit Token erlaubt)
router.post("/upload", verifyToken, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Keine Datei hochgeladen" });
  res.json({
    message: "Datei erfolgreich hochgeladen",
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  });
});

// Datei herunterladen (öffentlich erreichbar)
router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../../uploads", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Datei nicht gefunden" });
  }

  res.download(filePath);
});

export default router;