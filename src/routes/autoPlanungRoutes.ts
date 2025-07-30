import express from 'express';
import { autoPlanungStart } from '../controllers/autoPlanungController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';

const router = express.Router();

router.post('/start', authenticateToken, authorizeRoles(['admin']), autoPlanungStart);

export default router;