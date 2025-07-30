import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';
import { getAllAuftraege } from '../controllers/auftragController';

const router = Router();

router.get('/', authenticateToken, authorizeRoles(['admin', 'teamleiter']), getAllAuftraege);

export default router;
