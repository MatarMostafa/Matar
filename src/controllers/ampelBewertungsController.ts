import { Request, Response } from 'express';

// Holt alle Ampelbewertungen
export const getAmpelBewertungen = (req: Request, res: Response): void => {
  try {
    // Dummy Daten (kannst später mit DB verbinden)
    const bewertungen = [
      { mitarbeiterId: 1, status: 'grün', datum: '2025-07-01' },
      { mitarbeiterId: 2, status: 'gelb', datum: '2025-07-02' },
      { mitarbeiterId: 3, status: 'rot', datum: '2025-07-03' }
    ];

    res.status(200).json(bewertungen);
  } catch (error) {
    console.error('Fehler beim Abrufen der Ampelbewertungen:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Bewertungen' });
  }
};