import { Request, Response } from 'express';
import {
  sendNotificationToUser,
  getUserNotifications
} from '../Services/notificationService';

export const sendNotificationToUserHandler = async (req: Request, res: Response) => {
  try {
    const result = await sendNotificationToUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Senden der Benachrichtigung', error });
  }
};

export const getUserNotificationsHandler = async (req: Request, res: Response) => {
  try {
    const notifications = await getUserNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Benachrichtigungen', error });
  }
};