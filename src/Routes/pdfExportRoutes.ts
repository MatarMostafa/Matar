// src/Routes/pdfExportRoutes.ts

import express from "express";
import { generateAuftragPDF } from "../Services/pdfExportService";
import path from "path";
import fs from "fs";

const router = express.Router();

// Beispiel-Dummy: Exportiere PDF für Auftrag mit ID 1
router.get("/auftrag/:id", (req, res) => {
  const auftrag = {
    id: req.params.id,
    kunde: "Beispiel GmbH",
    datum: new Date().toISOString().slice(0, 10),
    beschreibung: "Reinigung Auftrag für Filiale X",
    status: "abgeschlossen"
  };

  const filename = generateAuftragPDF(auftrag);
  const filepath = path.join(__dirname, "../../exports", filename);

  if (fs.existsSync(filepath)) {
    res.download(filepath);
  } else {
    res.status(404).json({ message: "PDF nicht gefunden" });
  }
});

export default router;