// src/Routes/krankRoutes.ts

import express, { Request, Response } from "express";
import { krankmelden, getKrankmeldungen } from "../Services/krankService";
import { sendeBenachrichtigung } from "../Services/benachrichtigungService";

const router = express.Router();

// POST /api/krank
router.post("/", (req: Request, res: Response) => {
  const { mitarbeiterId, von, bis, grund } = req.body;

  if (!mitarbeiterId || !von || !bis || !grund) {
    return res.status(400).json({ message: "Alle Felder sind erforderlich" });
  }

  const meldung = krankmelden(mitarbeiterId, von, bis, grund);

  // ❗ Automatisch Benachrichtigung erzeugen
  sendeBenachrichtigung(
    mitarbeiterId,
    "Krankmeldung registriert",
    `Deine Krankmeldung vom ${von} bis ${bis} wurde erfasst.`
  );

  res.status(201).json(meldung);
});

// GET /api/krank/:mitarbeiterId
router.get("/:mitarbeiterId", (req: Request, res: Response) => {
  const id = parseInt(req.params.mitarbeiterId);
  const meldungen = getKrankmeldungen(id);
  res.json(meldungen);
});

export default router;