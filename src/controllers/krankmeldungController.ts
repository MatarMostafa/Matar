// src/Controllers/krankmeldungController.ts

import { Request, Response } from 'express';
import { meldeKrankheitService, getKrankmeldungenService } from '../Services/krankmeldungService';

export const meldeKrankheit = async (req: Request, res: Response) => {
  try {
    const meldung = await meldeKrankheitService(req.body);
    res.status(201).json(meldung);
  } catch (error) {
    res.status(500).json({ error: 'Krankmeldung fehlgeschlagen.' });
  }
};

export const getKrankmeldungen = async (_req: Request, res: Response) => {
  try {
    const meldungen = await getKrankmeldungenService();
    res.status(200).json(meldungen);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Krankmeldungen.' });
  }
};