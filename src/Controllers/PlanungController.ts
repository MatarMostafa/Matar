// src/Controllers/PlanungsController.ts
import { Request, Response } from "express";
import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";

// Planungslogik – nach Priorität
export const automatischePlanung = (req: Request, res: Response) => {
  const jetzt = new Date();
  const unbesetzte = auftraege.filter(a => 
    a.status === "offen" &&
    (!a.eingeteilteMitarbeiter || a.eingeteilteMitarbeiter.length === 0)
  );

  for (const auftrag of unbesetzte) {
    const passende = mitarbeiter
      .filter(m => m.status === "aktiv" && !m.urlaub && !m.krank)
      .sort((a, b) => a.prioritaet - b.prioritaet)
      .slice(0, auftrag.anzahlMitarbeiter || 1);

    auftrag.eingeteilteMitarbeiter = passende.map(m => ({
      mitarbeiterId: m.id,
      status: "zugewiesen",
    }));
    auftrag.status = "zugewiesen";
  }

  res.json({ message: "Automatische Planung durchgeführt", auftraege });
};