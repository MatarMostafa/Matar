import { Router, Request, Response } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { authorizeRoles } from '../Middleware/roleMiddleware';

const router = Router();

// Beispiel: Auto-Planung starten
router.post(
  '/start',
  authenticateToken,
  authorizeRoles(['admin', 'teamleiter']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Hier kommt deine Auto-Planungslogik rein
      res.json({ message: 'Auto-Planung erfolgreich gestartet' });
    } catch (error) {
      res.status(500).json({ message: 'Fehler bei Auto-Planung' });
    }
  }
);

export default router;
