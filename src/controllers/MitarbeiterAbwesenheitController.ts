// src/Controllers/MitarbeiterAbwesenheitController.ts

import { Request, Response } from "express";
import { mitarbeiter } from "../data/mitarbeiter";
import { auftraege } from "../data/auftraege";

// Urlaub beantragen
export const urlaubBeantragen = (req: Request, res: Response) => {
  const mitarbeiterId = (req as any).user.id;
  const { von, bis, kommentar } = req.body;

  const mitarbeiterEintrag = mitarbeiter.find((m) => m.id === mitarbeiterId);
  if (!mitarbeiterEintrag) {
    return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
  }

  mitarbeiterEintrag.urlaub = mitarbeiterEintrag.urlaub || [];
  mitarbeiterEintrag.urlaub.push({ von, bis, kommentar });

  res.json({ message: "Urlaub beantragt", urlaub: mitarbeiterEintrag.urlaub });
};

// Krankmeldung
export const krankmelden = (req: Request, res: Response) => {
  const mitarbeiterId = (req as any).user.id;
  const { datum, grund } = req.body;

  const mitarbeiterEintrag = mitarbeiter.find((m) => m.id === mitarbeiterId);
  if (!mitarbeiterEintrag) {
    return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
  }

  mitarbeiterEintrag.krankmeldungen = mitarbeiterEintrag.krankmeldungen || [];
  mitarbeiterEintrag.krankmeldungen.push({ datum, grund });

  // Bestehende Aufträge prüfen und Mitarbeiter austragen
  const betroffeneAuftraege = auftraege.filter((a) =>
    a.eingeteilteMitarbeiter?.some((e) => e.mitarbeiterId === mitarbeiterId)
  );

  for (const auftrag of betroffeneAuftraege) {
    const slot = auftrag.eingeteilteMitarbeiter.find((e) => e.mitarbeiterId === mitarbeiterId);
    if (slot) {
      slot.status = "krank";
      slot.begruendung = grund;
    }
  }

  res.json({
    message: "Krankmeldung erfasst",
    krankmeldungen: mitarbeiterEintrag.krankmeldungen,
  });
};