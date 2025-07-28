import { Request, Response } from 'express';

export const sendePush = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, message, empfängerId } = req.body;

    // Simuliere Push-Logik (hier würdest du dein Push-Modul integrieren)
    console.log(`📲 Push an ${empfängerId}: ${title} - ${message}`);

    res.status(200).json({ message: 'Push gesendet' });
  } catch (error) {
    console.error('Fehler beim Push-Versand:', error);
    res.status(500).json({ error: 'Fehler beim Push-Versand' });
  }
};