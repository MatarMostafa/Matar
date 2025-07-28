"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotification = exports.saveSubscription = void 0;
let subscriptions = [];
const saveSubscription = (sub) => {
    subscriptions.push(sub);
};
exports.saveSubscription = saveSubscription;
const sendPushNotification = async (title, message) => {
    console.log(`[Push] ${title}: ${message}`);
    // Hier könntest du mit web-push echte Nachrichten senden
};
exports.sendPushNotification = sendPushNotification;
