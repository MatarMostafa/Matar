// src/Routes/einsatzNotizRoutes.ts

import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Speicherort (JSON-Datei als Dummy-Datenbank)
const NOTIZ_DATEI = path.join(__dirname, "../../data/einsatznotizen.json");

// Hilfsfunktion: Datei laden
function ladeNotizen() {
  if (!fs.existsSync(NOTIZ_DATEI)) return [];
  const data = fs.readFileSync(NOTIZ_DATEI, "utf-8");
  return JSON.parse(data);
}

// Hilfsfunktion: Datei speichern
function speichereNotizen(notizen: any[]) {
  fs.writeFileSync(NOTIZ_DATEI, JSON.stringify(notizen, null, 2));
}

// GET /api/einsatznotizen/:auftragId
router.get("/:auftragId", (req: Request, res: Response) => {
  const { auftragId } = req.params;
  const notizen = ladeNotizen().filter(n => n.auftragId === Number(auftragId));
  res.json(notizen);
});

// POST /api/einsatznotizen/:auftragId
router.post("/:auftragId", (req: Request, res: Response) => {
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

export default router;