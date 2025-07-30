import express from 'express';
import { sendeEmail } from '../controllers/emailServiceController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';

const router = express.Router();

router.post('/sende', authenticateToken, authorizeRoles(['admin']), sendeEmail);

export default router;