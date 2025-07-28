"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNotificationsHandler = exports.sendNotificationToUserHandler = void 0;
const notificationService_1 = require("../Services/notificationService");
const sendNotificationToUserHandler = async (req, res) => {
    try {
        const result = await (0, notificationService_1.sendNotificationToUser)(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler beim Senden der Benachrichtigung', error });
    }
};
exports.sendNotificationToUserHandler = sendNotificationToUserHandler;
const getUserNotificationsHandler = async (req, res) => {
    try {
        const notifications = await (0, notificationService_1.getUserNotifications)();
        res.status(200).json(notifications);
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Benachrichtigungen', error });
    }
};
exports.getUserNotificationsHandler = getUserNotificationsHandler;
