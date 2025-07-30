import { Request, Response } from "express";

// JSON Export
export const exportiereJSON = async (_req: Request, res: Response): Promise<void> => {
  try {
    const daten = [{ id: 1, name: "Beispielauftrag" }];
    res.json(daten);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim JSON-Export" });
  }
};

// CSV Export (nur als Textbeispiel)
export const exportiereCSV = async (_req: Request, res: Response): Promise<void> => {
  try {
    const csv = "ID,Name\n1,Beispielauftrag";
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=export.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim CSV-Export" });
  }
};

// Erweiterter CSV Export für Aufträge
export const exportiereAuftraegeAlsCSV = async (_req: Request, res: Response): Promise<void> => {
  try {
    const csv = "AuftragID,Beschreibung\n1001,Testauftrag";
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=auftraege.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Auftragsexport" });
  }
};
