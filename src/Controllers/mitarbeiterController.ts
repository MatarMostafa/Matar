import { Request, Response } from 'express';
import * as mitarbeiterService from '../Services/mitarbeiterService';

export const holeAlleMitarbeiter = async (req: Request, res: Response): Promise<void> => {
  try {
    const mitarbeiter = await mitarbeiterService.getAll();
    res.json(mitarbeiter);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Mitarbeiter' });
  }
};

export const holeMitarbeiterById = async (req: Request, res: Response): Promise<void> => {
  try {
    const mitarbeiter = await mitarbeiterService.getById?.(req.params.id); // optional chaining
    if (!mitarbeiter) {
      res.status(404).json({ message: 'Mitarbeiter nicht gefunden' });
      return;
    }
    res.json(mitarbeiter);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen des Mitarbeiters' });
  }
};

export const erstelleMitarbeiter = async (req: Request, res: Response): Promise<void> => {
  try {
    const neuerMitarbeiter = await mitarbeiterService.create(req.body);
    res.status(201).json(neuerMitarbeiter);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Erstellen des Mitarbeiters' });
  }
};

export const aktualisiereMitarbeiter = async (req: Request, res: Response): Promise<void> => {
  try {
    const aktualisiert = await mitarbeiterService.update(req.params.id, req.body);
    res.json(aktualisiert);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Aktualisieren des Mitarbeiters' });
  }
};

export const loescheMitarbeiter = async (req: Request, res: Response): Promise<void> => {
  try {
    await mitarbeiterService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Löschen des Mitarbeiters' });
  }
};
