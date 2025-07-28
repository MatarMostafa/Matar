// src/Controllers/abwesenheitController.ts

import { Request, Response } from "express";
import { urlaub } from "../data/urlaub";
import { krankmeldungen } from "../data/krank";

export const getAlleAbwesenheiten = (req: Request, res: Response) => {
  const abwesenheiten = [...urlaub, ...krankmeldungen];

  // Optional sortiert nach Mitarbeiter und Datum
  abwesenheiten.sort((a, b) => {
    if (a.mitarbeiterId === b.mitarbeiterId) {
      return new Date(a.von).getTime() - new Date(b.von).getTime();
    }
    return a.mitarbeiterId - b.mitarbeiterId;
  });

  res.json(abwesenheiten);
};