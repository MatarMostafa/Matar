import { Router, Request, Response } from 'express';
import { authenticateToken } from '../Middleware/authMiddleware';
import { authorizeRoles } from '../Middleware/roleMiddleware';
import {
  holeAlleMitarbeiter,
  holeMitarbeiterById,
  erstelleMitarbeiter,
  aktualisiereMitarbeiter,
  loescheMitarbeiter
} from '../Controllers/mitarbeiterController';

const router = Router();

// GET alle Mitarbeiter
router.get(
  '/',
  authenticateToken,
  authorizeRoles(['admin', 'teamleiter']),
  async (req: Request, res: Response): Promise<void> => {
    const result = await holeAlleMitarbeiter(req, res);
    // Controller sendet Antwort direkt
  }
);

// GET Mitarbeiter by ID
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles(['admin', 'teamleiter']),
  async (req: Request, res: Response): Promise<void> => {
    const result = await holeMitarbeiterById(req, res);
  }
);

// POST neuer Mitarbeiter
router.post(
  '/',
  authenticateToken,
  authorizeRoles(['admin']),
  async (req: Request, res: Response): Promise<void> => {
    const result = await erstelleMitarbeiter(req, res);
  }
);

// PUT Mitarbeiter aktualisieren
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles(['admin', 'teamleiter']),
  async (req: Request, res: Response): Promise<void> => {
    const result = await aktualisiereMitarbeiter(req, res);
  }
);

// DELETE Mitarbeiter löschen
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles(['admin']),
  async (req: Request, res: Response): Promise<void> => {
    const result = await loescheMitarbeiter(req, res);
  }
);

export default router;
