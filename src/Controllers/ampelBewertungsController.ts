import { Request, Response } from 'express';
import * as ampelService from '../Services/ampelBewertungsService';

export const getAllBewertungen = (req: Request, res: Response) => {
  const result = ampelService.getAllBewertungen();
  res.json(result);
};

export const getBewertungenByMitarbeiter = (req: Request, res: Response) => {
  const mitarbeiterId = req.params.mitarbeiterId;
  const result = ampelService.getBewertungenByMitarbeiter(mitarbeiterId);
  res.json(result);
};

export const createBewertung = (req: Request, res: Response) => {
  const newBewertung = ampelService.createBewertung(req.body);
  res.status(201).json(newBewertung);
};

export const deleteBewertung = (req: Request, res: Response) => {
  const id = req.params.id;
  const deleted = ampelService.deleteBewertung(id);
  if (deleted) {
    res.json({ message: 'Bewertung gelöscht' });
  } else {
    res.status(404).json({ message: 'Nicht gefunden' });
  }
};