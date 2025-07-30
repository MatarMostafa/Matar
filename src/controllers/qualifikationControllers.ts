// src/Controllers/qualifikationController.ts

import { Request, Response } from "express";
import { qualifikationen } from "../data/qualifikationen";
import { mitarbeiter } from "../data/mitarbeiter";

// Alle Qualifikationen abrufen
export const getAlleQualifikationen = (req: Request, res: Response) => {
  res.json(qualifikationen);
};

// Neue Qualifikation hinzufügen
export const erstelleQualifikation = (req: Request, res: Response) => {
  const { bezeichnung } = req.body;
  if (!bezeichnung) {
    return res.status(400).json({ message: "Bezeichnung ist erforderlich" });
  }

  const neueQuali = {
    id: qualifikationen.length + 1,
    bezeichnung,
  };
  qualifikationen.push(neueQuali);

  res.status(201).json({ message: "Qualifikation hinzugefügt", qualifikation: neueQuali });
};

// Qualifikationen zuweisen
export const setzeMitarbeiterQualifikationen = (req: Request, res: Response) => {
  const { mitarbeiterId, qualifikationenIds } = req.body;

  const mitarb = mitarbeiter.find((m) => m.id === mitarbeiterId);
  if (!mitarb) {
    return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
  }

  mitarb.qualifikationen = qualifikationenIds;
  res.json({ message: "Qualifikationen aktualisiert", mitarbeiter: mitarb });
};
import { Request, Response } from "express";
import { qualifikationen } from "../data/qualifikationen";
import { mitarbeiterQualifikationen } from "../data/mitarbeiterQualifikationen";

export const getAlleQualifikationen = (_req: Request, res: Response) => {
  res.json(qualifikationen);
};

export const getQualifikationenVonMitarbeiter = (req: Request, res: Response) => {
  const mitarbeiterId = parseInt(req.params.id);
  const zugewiesene = mitarbeiterQualifikationen.filter(q => q.mitarbeiterId === mitarbeiterId);
  res.json(zugewiesene);
};
// src/Controllers/qualifikationController.ts

import { Request, Response } from "express";
import { qualifikationen } from "../data/qualifikationen";

export const getAlleQualifikationen = (_req: Request, res: Response) => {
  res.json(qualifikationen);
};