// src/Controllers/krankController.ts

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

interface Krankmeldung {
  id: string;
  mitarbeiterId: number;
  von: string;
  bis: string;
  status: "offen" | "akzeptiert" | "abgelehnt";
  grund: string;
}

const krankmeldungen: Krankmeldung[] = [];

// Krankmeldung einreichen
export const reicheKrankmeldungEin = (req: Request, res: Response) => {
  const { mitarbeiterId, von, bis, grund } = req.body;

  if (!mitarbeiterId || !von || !bis || !grund) {
    return res.status(400).json({ message: "Alle Felder sind erforderlich." });
  }

  const neueMeldung: Krankmeldung = {
    id: uuidv4(),
    mitarbeiterId,
    von,
    bis,
    grund,
    status: "offen",
  };

  krankmeldungen.push(neueMeldung);

  return res.status(201).json({
    message: "Krankmeldung eingereicht",
    meldung: neueMeldung,
  });
};

// Genehmigen
export const genehmigeKrankmeldung = (req: Request, res: Response) => {
  const { id } = req.params;

  const meldung = krankmeldungen.find((m) => m.id === id);
  if (!meldung) {
    return res.status(404).json({ message: "Krankmeldung nicht gefunden." });
  }

  meldung.status = "akzeptiert";
  return res.status(200).json({ message: "Krankmeldung akzeptiert", meldung });
};

// Ablehnen
export const lehneKrankmeldungAb = (req: Request, res: Response) => {
  const { id } = req.params;

  const meldung = krankmeldungen.find((m) => m.id === id);
  if (!meldung) {
    return res.status(404).json({ message: "Krankmeldung nicht gefunden." });
  }

  meldung.status = "abgelehnt";
  return res.status(200).json({ message: "Krankmeldung abgelehnt", meldung });
};

// Alle anzeigen
export const getAlleKrankmeldungen = (_req: Request, res: Response) => {
  res.status(200).json({ meldungen: krankmeldungen });
};