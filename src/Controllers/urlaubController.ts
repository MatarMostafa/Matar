// src/Controllers/urlaubController.ts

import { Request, Response } from "express";
import { urlaubsantraege, Urlaubsantrag } from "../data/urlaubsantraege";

// POST /api/urlaub
export const stelleUrlaubsantrag = (req: Request, res: Response) => {
  const { mitarbeiterId, von, bis, grund } = req.body;

  if (!mitarbeiterId || !von || !bis || !grund) {
    return res.status(400).json({ message: "Fehlende Felder im Antrag." });
  }

  const neuerAntrag: Urlaubsantrag = {
    id: urlaubsantraege.length + 1,
    mitarbeiterId,
    von,
    bis,
    grund,
    status: "offen",
  };

  urlaubsantraege.push(neuerAntrag);
  res.status(201).json({ message: "Urlaubsantrag gestellt.", antrag: neuerAntrag });
};

// GET /api/urlaub
export const getAlleUrlaubsantraege = (_req: Request, res: Response) => {
  res.json(urlaubsantraege);
};

// PUT /api/urlaub/genehmigen/:id
export const genehmigeUrlaub = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const antrag = urlaubsantraege.find((a) => a.id === id);

  if (!antrag) {
    return res.status(404).json({ message: "Antrag nicht gefunden." });
  }

  antrag.status = "genehmigt";
  res.json({ message: "Urlaub genehmigt.", antrag });
};

// PUT /api/urlaub/ablehnen/:id
export const lehneUrlaubAb = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const antrag = urlaubsantraege.find((a) => a.id === id);

  if (!antrag) {
    return res.status(404).json({ message: "Antrag nicht gefunden." });
  }

  antrag.status = "abgelehnt";
  res.json({ message: "Urlaub abgelehnt.", antrag });
};
// src/Routes/urlaubRoutes.ts

import express from "express";
import { getUrlaube, beantrageUrlaub, genehmigeUrlaub, lehneUrlaubAb } from "../Controllers/urlaubController";

const router = express.Router();

// Alle Urlaubsanträge abrufen
router.get("/", getUrlaube);

// Urlaub beantragen
router.post("/", beantrageUrlaub);

// Urlaub genehmigen
router.patch("/:id/genehmigen", genehmigeUrlaub);

// Urlaub ablehnen
router.patch("/:id/ablehnen", lehneUrlaubAb);

export default router;