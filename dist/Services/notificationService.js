"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNotifications = exports.sendNotificationToUser = void 0;
const notifications = [];
const sendNotificationToUser = async (data) => {
    const newNotification = {
        ...data,
        zeitpunkt: new Date()
    };
    notifications.push(newNotification);
    return newNotification;
};
exports.sendNotificationToUser = sendNotificationToUser;
const getUserNotifications = async () => {
    return notifications;
};
exports.getUserNotifications = getUserNotifications;
