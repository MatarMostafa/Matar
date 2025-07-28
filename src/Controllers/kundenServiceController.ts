import { Request, Response } from "express";

// Beispiel-Daten
const kundenListe = [
  { id: 1, name: "Kunde A", status: "aktiv", auftraege: 12 },
  { id: 2, name: "Kunde B", status: "inaktiv", auftraege: 5 }
];

// Controller: Kundenübersicht
export const getKundenUebersicht = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json(kundenListe);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Laden der Kundenübersicht" });
  }
};
