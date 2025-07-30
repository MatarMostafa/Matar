import express, { Request, Response } from 'express';
import { saveSubscription, sendPushNotification } from '../Services/pushService';
import { verifyToken } from '../Middleware/authMiddleware';

const router = express.Router();

router.post('/subscribe', verifyToken, async (req: Request, res: Response) => {
  try {
    await saveSubscription(req.body);
    res.status(200).json({ message: 'Abo gespeichert' });
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Speichern des Abos' });
  }
});

router.post('/notify', verifyToken, async (req: Request, res: Response) => {
  try {
    const { title, message } = req.body;
    await sendPushNotification(title, message);
    res.status(200).json({ message: 'Benachrichtigung gesendet' });
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Senden der Benachrichtigung' });
  }
});

export default router;