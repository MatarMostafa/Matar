import { Request, Response } from 'express';

// Startet die automatische Planung
export const autoPlanungStart = (req: Request, res: Response): void => {
  try {
    // Platzhalter für die eigentliche Logik
    console.log("Automatische Planung gestartet...");

    res.status(200).json({ message: "Automatische Planung erfolgreich gestartet" });
  } catch (error) {
    console.error("Fehler bei der automatischen Planung:", error);
    res.status(500).json({ error: "Fehler bei der automatischen Planung" });
  }
};