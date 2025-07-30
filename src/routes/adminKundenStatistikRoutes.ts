import express from 'express';
import { getAdminStatistik } from '../controllers/adminKundenStatistikController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles(['admin']), getAdminStatistik);

export default router;