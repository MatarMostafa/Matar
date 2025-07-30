// src/Controllers/StundenController.ts
import { Request, Response } from "express";
import { auftraege } from "../data/auftraege";

export const stundenUebersicht = (req: Request, res: Response) => {
  const zusammenfassung: Record<string, number> = {};

  auftraege.forEach(a => {
    if (!a.eingeteilteMitarbeiter) return;

    a.eingeteilteMitarbeiter.forEach(e => {
      zusammenfassung[e.mitarbeiterId] = 
        (zusammenfassung[e.mitarbeiterId] || 0) + (a.dauer || 0);
    });
  });

  res.json({ zusammenfassung });
};