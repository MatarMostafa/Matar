// src/Routes/adminKundenRoutes.ts

import express, { Request, Response } from "express";
import {
  getAlleKunden,
  addKunde,
  addUnteraccount,
  deleteUnteraccount,
} from "../Services/adminKundenService";

const router = express.Router();

// GET /api/admin/kunden – alle Kunden anzeigen
router.get("/kunden", (req: Request, res: Response) => {
  const kunden = getAlleKunden();
  res.json(kunden);
});

// POST /api/admin/kunden – neuen Kunden anlegen
router.post("/kunden", (req: Request, res: Response) => {
  const { hauptEmail } = req.body;
  if (!hauptEmail) return res.status(400).json({ message: "Email erforderlich" });

  const neuerKunde = addKunde(hauptEmail);
  res.status(201).json(neuerKunde);
});

// POST /api/admin/kunden/:id/unteraccount – Unteraccount hinzufügen
router.post("/kunden/:id/unteraccount", (req: Request, res: Response) => {
  const kundeId = parseInt(req.params.id);
  const { email, passwort } = req.body;
  const neuerUA = addUnteraccount(kundeId, email, passwort);
  if (neuerUA) {
    res.status(201).json(neuerUA);
  } else {
    res.status(404).json({ message: "Kunde nicht gefunden" });
  }
});

// DELETE /api/admin/kunden/:kundeId/unteraccount/:unteraccountId
router.delete("/kunden/:kundeId/unteraccount/:unteraccountId", (req: Request, res: Response) => {
  const kundeId = parseInt(req.params.kundeId);
  const unteraccountId = parseInt(req.params.unteraccountId);
  const success = deleteUnteraccount(kundeId, unteraccountId);
  if (success) {
    res.status(200).json({ message: "Unteraccount gelöscht" });
  } else {
    res.status(404).json({ message: "Nicht gefunden" });
  }
});

export default router;