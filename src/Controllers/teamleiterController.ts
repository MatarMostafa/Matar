// src/Controllers/teamleiterController.ts

import { Request, Response } from "express";
import { mitarbeiter } from "../data/mitarbeiter";

export const getAlleTeamleiter = (_req: Request, res: Response) => {
  const teamleiter = mitarbeiter.filter(m => m.role === "teamleiter");
  res.json(teamleiter);
};

export const weiseMitarbeiterZu = (req: Request, res: Response) => {
  const { mitarbeiterId, teamleiterId } = req.body;

  const mitarb = mitarbeiter.find(m => m.id === mitarbeiterId);
  const leiter = mitarbeiter.find(t => t.id === teamleiterId && t.role === "teamleiter");

  if (!mitarb || !leiter) {
    return res.status(404).json({ message: "Teamleiter oder Mitarbeiter nicht gefunden" });
  }

  mitarb.teamleiterId = teamleiterId;
  res.json({ message: "Mitarbeiter erfolgreich zugewiesen", mitarbeiter: mitarb });
};
// src/Controllers/teamleiterController.ts

import { Request, Response } from "express";
import { auftraege } from "../data/auftraege";

// Aufträge für Teamleiter abrufen
export const getAuftraegeFuerTeamleiter = (req: Request, res: Response) => {
  const teamleiterId = parseInt(req.params.teamleiterId);
  const zugewiesene = auftraege.filter(a => a.teamleiterId === teamleiterId);
  res.json(zugewiesene);
};

// Rückmeldung zu einem Auftrag geben
export const rueckmeldungGeben = (req: Request, res: Response) => {
  const auftragId = parseInt(req.params.auftragId);
  const { kommentar } = req.body;

  const auftrag = auftraege.find(a => a.id === auftragId);
  if (!auftrag) {
    return res.status(404).json({ message: "Auftrag nicht gefunden" });
  }

  auftrag.teamleiterRueckmeldung = kommentar;
  res.json({ message: "Rückmeldung gespeichert", auftrag });
};

// Auftrag freigeben
export const auftragFreigeben = (req: Request, res: Response) => {
  const auftragId = parseInt(req.params.auftragId);

  const auftrag = auftraege.find(a => a.id === auftragId);
  if (!auftrag) {
    return res.status(404).json({ message: "Auftrag nicht gefunden" });
  }

  auftrag.status = "freigegeben";
  res.json({ message: "Auftrag freigegeben", auftrag });
};

// Auftrag eskalieren
export const auftragEskalieren = (req: Request, res: Response) => {
  const auftragId = parseInt(req.params.auftragId);

  const auftrag = auftraege.find(a => a.id === auftragId);
  if (!auftrag) {
    return res.status(404).json({ message: "Auftrag nicht gefunden" });
  }

  auftrag.status = "eskaliert";
  res.json({ message: "Auftrag wurde eskaliert", auftrag });
};