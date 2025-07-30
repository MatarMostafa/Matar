import { Request, Response } from 'express';

// Beispielhafte Statistikdaten
export const getAdminStatistik = (_req: Request, res: Response): void => {
  try {
    const statistik = {
      userCount: 150,
      activeUsers: 120,
      inactiveUsers: 30,
      auftraege: 45,
      completedAuftraege: 40,
      pendingAuftraege: 5
    };

    res.status(200).json(statistik);
  } catch (error) {
    console.error('Fehler beim Abrufen der Admin-Statistik:', error);
    res.status(500).json({ message: 'Fehler beim Abrufen der Statistik' });
  }
};

// Beispiel für detaillierte User-Statistik
export const getAdminUserStatistik = (_req: Request, res: Response): void => {
  try {
    const userStats = [
      { id: 1, name: 'Max Mustermann', role: 'Admin', auftraege: 12 },
      { id: 2, name: 'Erika Musterfrau', role: 'Teamleiter', auftraege: 8 },
      { id: 3, name: 'John Doe', role: 'Mitarbeiter', auftraege: 5 }
    ];

    res.status(200).json(userStats);
  } catch (error) {
    console.error('Fehler beim Abrufen der User-Statistik:', error);
    res.status(500).json({ message: 'Fehler beim Abrufen der User-Statistik' });
  }
};
