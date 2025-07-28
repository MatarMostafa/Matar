import { Request, Response } from "express";
import { bewertungen } from "../data/bewertungen";
import { sperrliste } from "../data/sperrliste";

// Mitarbeiter bewerten (Ampelprinzip)
export const bewerteMitarbeiter = (req: Request, res: Response) => {
  const { auftragId, mitarbeiterId, kundeId, bewertung, kommentar } = req.body;

  if (!["grün", "gelb", "rot"].includes(bewertung)) {
    return res.status(400).json({ message: "Ungültige Bewertung" });
  }

  if (bewertung === "rot" && (!kommentar || kommentar.trim() === "")) {
    return res.status(400).json({ message: "Kommentar ist bei roter Bewertung erforderlich" });
  }

  bewertungen.push({
    auftragId,
    mitarbeiterId,
    kundeId,
    bewertung,
    kommentar: kommentar || null,
    datum: new Date(),
  });

  if (bewertung === "rot") {
    sperrliste.push({
      mitarbeiterId,
      kundeId,
      kommentar,
      gesperrtAm: new Date(),
    });
  }

  res.status(200).json({ message: "Bewertung gespeichert" });
};

// Admin: Alle Bewertungen sehen
export const getBewertungenFuerAdmin = (_req: Request, res: Response) => {
  res.status(200).json(bewertungen);
};

// Kunde: Eigene Bewertungen sehen
export const getBewertungenFuerKunde = (req: Request, res: Response) => {
  const kundeId = Number(req.query.kundeId);
  const eigene = bewertungen.filter(b => b.kundeId === kundeId);
  res.status(200).json(eigene);
};

// Admin/Kunde gibt Mitarbeiter wieder frei
export const mitarbeiterWiederFreigeben = (req: Request, res: Response) => {
  const { mitarbeiterId, kundeId } = req.body;
  const index = sperrliste.findIndex(
    (s) => s.mitarbeiterId === mitarbeiterId && s.kundeId === kundeId
  );

  if (index !== -1) {
    sperrliste.splice(index, 1);
    return res.status(200).json({ message: "Mitarbeiter wurde freigegeben" });
  }

  res.status(404).json({ message: "Eintrag nicht gefunden" });
};
// src/Controllers/bewertungController.ts

import { Request, Response } from "express";
import { bewertungen, Bewertung, AmpelStatus } from "../data/bewertungen";

// Bewertung setzen oder aktualisieren
export const setBewertung = (req: Request, res: Response) => {
  const { mitarbeiterId, status, grund } = req.body;

  if (!mitarbeiterId || !status) {
    return res.status(400).json({ message: "Mitarbeiter-ID und Status erforderlich" });
  }

  const existing = bewertungen.find(b => b.mitarbeiterId === mitarbeiterId);

  if (existing) {
    existing.status = status;
    existing.grund = grund;
  } else {
    const neueBewertung: Bewertung = { mitarbeiterId, status, grund };
    bewertungen.push(neueBewertung);
  }

  res.status(200).json({ message: "Bewertung gespeichert", mitarbeiterId, status });
};

// Alle Bewertungen abrufen
export const getBewertungen = (_req: Request, res: Response) => {
  res.json(bewertungen);
};
import { Request, Response } from "express";
import { bewertungen, Bewertung } from "../data/bewertungen";

let nextBewertungId = 1;

export const erstelleBewertung = (req: Request, res: Response) => {
  const { mitarbeiterId, auftragId, status, bemerkung } = req.body;

  if (!["grün", "gelb", "rot"].includes(status)) {
    return res.status(400).json({ message: "Ungültiger Status" });
  }

  const neueBewertung: Bewertung = {
    id: nextBewertungId++,
    mitarbeiterId,
    auftragId,
    status,
    bemerkung,
    erstelltAm: new Date(),
  };

  bewertungen.push(neueBewertung);
  return res.status(201).json({ message: "Bewertung gespeichert", bewertung: neueBewertung });
};

export const holeBewertungen = (req: Request, res: Response) => {
  res.json(bewertungen);
};