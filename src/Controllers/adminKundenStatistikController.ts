import { Request, Response } from 'express';
import { getAdminUserStatistik } from '../Services/adminUserStatistikService';

export const getAdminStatistik = async (req: Request, res: Response) => {
  try {
    const statistik = await getAdminUserStatistik();
    res.status(200).json(statistik);
  } catch (error) {
    console.error('Fehler beim Abrufen der Admin-Statistik:', error);
    res.status(500).json({ message: 'Fehler beim Abrufen der Admin-Statistik' });
  }
};