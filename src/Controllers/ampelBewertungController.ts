import { Request, Response } from 'express';

export const createBewertung = async (req: Request, res: Response) => {
  res.status(201).json({ message: 'Bewertung erstellt' });
};

export const getBewertungen = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Alle Bewertungen' });
};

export const getBewertungById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Bewertung mit ID ${id}` });
};

export const updateBewertung = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Bewertung ${id} aktualisiert` });
};

export const deleteBewertung = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ message: `Bewertung ${id} gelöscht` });
};