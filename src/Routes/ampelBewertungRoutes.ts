import express, { Request, Response, NextFunction } from 'express';
import { bewerteteMitarbeiterAmpelHandler } from '../Controllers/ampelBewertungController';
import { authenticate } from '../Middleware/authMiddleware';
import { authorizeRole } from '../Middleware/roleMiddleware';

const router = express.Router();

// Route: POST /bewerteAmpel
router.post(
  '/bewerteAmpel',
  (req: Request, res: Response, next: NextFunction) => authenticate(req, res, next),
  authorizeRole(['admin', 'teamleiter']),
  bewerteteMitarbeiterAmpelHandler
);

export default router;