// src/Services/fallbackService.ts
import { Request, Response } from "express";
import { mitarbeiter } from "../data/mitarbeiter";
import { einsaetze } from "../data/einsaetze";

export const handleMitarbeiterAusfall = (req: Request, res: Response) => {
  const { mitarbeiterId, datum } = req.body;

  const ausfallEinsatz = einsaetze.find(
    (einsatz) =>
      einsatz.mitarbeiterId === mitarbeiterId &&
      einsatz.datum === datum
  );

  if (!ausfallEinsatz) {
    return res.status(404).json({ message: "Kein Einsatz für diesen Mitarbeiter an diesem Tag gefunden" });
  }

  const qualifikation = mitarbeiter.find(m => m.id === mitarbeiterId)?.qualifikation;

  const ersatz = mitarbeiter.find(m =>
    m.id !== mitarbeiterId &&
    m.qualifikation === qualifikation &&
    !einsaetze.some(e => e.mitarbeiterId === m.id && e.datum === datum)
  );

  if (!ersatz) {
    return res.status(404).json({ message: "Kein Ersatzmitarbeiter verfügbar" });
  }

  ausfallEinsatz.mitarbeiterId = ersatz.id;

  return res.status(200).json({
    message: "Ersatzmitarbeiter erfolgreich zugewiesen",
    einsatz: ausfallEinsatz,
    ersatzMitarbeiter: ersatz
  });
};
// src/Services/fallbackService.ts

import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";
import { abwesenheiten } from "../data/abwesenheiten";
import { istGesperrt } from "./mitarbeitersperreService";

export const findeErsatzMitarbeiter = (
  ausfallMitarbeiterId: number,
  auftragsDatum: string,
  qualifikation: string
): number | null => {
  const verfuegbare = mitarbeiter.filter((m) => {
    if (
      m.id === ausfallMitarbeiterId ||
      !m.qualifikationen.includes(qualifikation) ||
      abwesenheiten.some((a) => a.mitarbeiterId === m.id && a.datum === auftragsDatum) ||
      istGesperrt(m.id, auftragsDatum)
    ) {
      return false;
    }
    return true;
  });

  return verfuegbare.length > 0 ? verfuegbare[0].id : null;
};

export const setzeErsatzImAuftrag = (
  auftragId: number,
  neuerMitarbeiterId: number
): boolean => {
  const auftrag = auftraege.find((a) => a.id === auftragId);
  if (!auftrag) return false;

  auftrag.mitarbeiterId = neuerMitarbeiterId;
  return true;
};