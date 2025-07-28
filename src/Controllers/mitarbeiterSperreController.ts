import { Request, Response } from "express";
import { mitarbeiterSperren, Mitarbeitersperre } from "../data/mitarbeiterSperren";

let nextSperreId = 1;

export const erstelleSperre = (req: Request, res: Response) => {
  const { mitarbeiterId, grund, von, bis } = req.body;

  if (!mitarbeiterId || !grund || !von || !bis) {
    return res.status(400).json({ message: "Alle Felder müssen ausgefüllt werden" });
  }

  const neueSperre: Mitarbeitersperre = {
    id: nextSperreId++,
    mitarbeiterId,
    grund,
    von,
    bis,
  };

  mitarbeiterSperren.push(neueSperre);
  return res.status(201).json({ message: "Sperre eingetragen", sperre: neueSperre });
};

export const holeSperren = (_req: Request, res: Response) => {
  res.json(mitarbeiterSperren);
};
// src/Controllers/mitarbeitersperreController.ts

import { Request, Response } from "express";
import { mitarbeitersperren, Mitarbeitersperre } from "../data/mitarbeitersperren";

// Alle Sperren abrufen
export const getSperren = (_req: Request, res: Response) => {
  res.json(mitarbeitersperren);
};

// Neue Sperre hinzufügen
export const addSperre = (req: Request, res: Response) => {
  const { mitarbeiterId, grund, von, bis } = req.body;

  const neueSperre: Mitarbeitersperre = {
    id: mitarbeitersperren.length + 1,
    mitarbeiterId,
    grund,
    von,
    bis,
    aktiv: true,
  };

  mitarbeitersperren.push(neueSperre);
  res.status(201).json({ message: "Mitarbeiter wurde gesperrt", sperre: neueSperre });
};

// Sperre deaktivieren
export const entsperren = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const sperre = mitarbeitersperren.find((s) => s.id === id);

  if (!sperre) {
    return res.status(404).json({ message: "Sperre nicht gefunden" });
  }

  sperre.aktiv = false;
  res.json({ message: "Mitarbeiter entsperrt", sperre });
};