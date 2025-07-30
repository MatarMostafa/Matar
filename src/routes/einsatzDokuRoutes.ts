// src/Routes/einsatzDokuRoutes.ts

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Speicherort + Dateiname
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, "../../uploads/einsaetze");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

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

export default router;