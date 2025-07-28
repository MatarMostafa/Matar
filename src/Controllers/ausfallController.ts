import { Request, Response } from 'express';

export const sperreMitarbeiter = async (req: Request, res: Response) => {
  const { mitarbeiterId } = req.body;
  // Logik zum Sperren
  res.status(200).json({ message: `Mitarbeiter ${mitarbeiterId} gesperrt` });
};

export const freigebenMitarbeiter = async (req: Request, res: Response) => {
  const { mitarbeiterId } = req.body;
  // Logik zum Freigeben
  res.status(200).json({ message: `Mitarbeiter ${mitarbeiterId} freigegeben` });
};