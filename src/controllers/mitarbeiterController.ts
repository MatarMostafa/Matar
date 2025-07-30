import { Request, Response } from 'express';
import { mitarbeiterData } from '../data/mitarbeiter';
import { Mitarbeiter } from '../types/mitarbeiter';

// Alle Mitarbeiter abrufen
export const getAllMitarbeiter = (req: Request, res: Response): void => {
  res.json(mitarbeiterData);
};

// Mitarbeiter nach ID abrufen
export const getMitarbeiterById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const mitarbeiter = mitarbeiterData.find(m => m.id === id);
  if (!mitarbeiter) {
    res.status(404).json({ message: 'Mitarbeiter nicht gefunden' });
    return;
  }
  res.json(mitarbeiter);
};

// Neuen Mitarbeiter erstellen
export const createMitarbeiter = (req: Request, res: Response): void => {
  const neuerMitarbeiter: Mitarbeiter = {
    id: mitarbeiterData.length + 1,
    name: req.body.name,
    rolle: req.body.rolle,
    aktiv: true
  };
  mitarbeiterData.push(neuerMitarbeiter);
  res.status(201).json(neuerMitarbeiter);
};

// Mitarbeiter aktualisieren
export const updateMitarbeiter = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const index = mitarbeiterData.findIndex(m => m.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Mitarbeiter nicht gefunden' });
    return;
  }

  mitarbeiterData[index] = { ...mitarbeiterData[index], ...req.body };
  res.json(mitarbeiterData[index]);
};

// Mitarbeiter löschen
export const deleteMitarbeiter = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const index = mitarbeiterData.findIndex(m => m.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Mitarbeiter nicht gefunden' });
    return;
  }

  const geloescht = mitarbeiterData.splice(index, 1);
  res.json({ message: 'Mitarbeiter gelöscht', mitarbeiter: geloescht[0] });
};
