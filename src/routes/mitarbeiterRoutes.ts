import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';
import {
  getAllMitarbeiter,
  getMitarbeiterById,
  createMitarbeiter,
  updateMitarbeiter,
  deleteMitarbeiter
} from '../controllers/mitarbeiterController';

const router = Router();

// GET alle Mitarbeiter
router.get('/', authenticateToken, authorizeRoles(['admin', 'teamleiter']), getAllMitarbeiter);

// GET Mitarbeiter nach ID
router.get('/:id', authenticateToken, authorizeRoles(['admin', 'teamleiter']), getMitarbeiterById);

// POST neuer Mitarbeiter
router.post('/', authenticateToken, authorizeRoles(['admin']), createMitarbeiter);

// PUT Mitarbeiter aktualisieren
router.put('/:id', authenticateToken, authorizeRoles(['admin', 'teamleiter']), updateMitarbeiter);

// DELETE Mitarbeiter löschen
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), deleteMitarbeiter);

export default router;
