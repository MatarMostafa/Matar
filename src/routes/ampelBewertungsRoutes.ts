import express from 'express';
import { getAmpelBewertungen } from '../controllers/ampelBewertungsController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles(['admin', 'teamleiter']), getAmpelBewertungen);

export default router;