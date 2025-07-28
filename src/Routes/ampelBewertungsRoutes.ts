import { Router, Request, Response } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { authorizeRoles } from '../Middleware/roleMiddleware';

const router = Router();

// Beispiel-Endpunkt: Ampelbewertung erstellen
router.post(
  '/create',
  authenticateToken,
  authorizeRoles(['admin', 'teamleiter']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({ message: 'Ampelbewertung erstellt' });
    } catch (error) {
      res.status(500).json({ message: 'Fehler bei Erstellung' });
    }
  }
);

// Beispiel-Endpunkt: Ampelbewertung aktualisieren
router.put(
  '/update/:id',
  authenticateToken,
  authorizeRoles(['admin', 'teamleiter']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({ message: `Ampelbewertung ${req.params.id} aktualisiert` });
    } catch (error) {
      res.status(500).json({ message: 'Fehler bei Aktualisierung' });
    }
  }
);

// Beispiel-Endpunkt: Ampelbewertung löschen
router.delete(
  '/delete/:id',
  authenticateToken,
  authorizeRoles(['admin', 'teamleiter']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({ message: `Ampelbewertung ${req.params.id} gelöscht` });
    } catch (error) {
      res.status(500).json({ message: 'Fehler beim Löschen' });
    }
  }
);

// Beispiel-Endpunkt: Nur Admin
router.get(
  '/admin-only',
  authenticateToken,
  authorizeRoles(['admin']),
  async (_req: Request, res: Response): Promise<void> => {
    try {
      res.json({ message: 'Admin-Bereich erfolgreich geladen' });
    } catch (error) {
      res.status(500).json({ message: 'Fehler im Admin-Bereich' });
    }
  }
);

export default router;
