import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';
import { sendNotificationToUserHandler, getUserNotificationsHandler } from '../controllers/notificationController';

const router = Router();

router.post('/send', authenticateToken, authorizeRoles(['admin', 'teamleiter']), sendNotificationToUserHandler);
router.get('/:userId', authenticateToken, authorizeRoles(['admin', 'teamleiter', 'mitarbeiter']), getUserNotificationsHandler);

export default router;
