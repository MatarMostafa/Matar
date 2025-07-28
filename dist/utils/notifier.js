"use strict";
// src/Utils/notifier.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const sendNotification = (toRole, message) => {
    const rollen = Array.isArray(toRole) ? toRole : [toRole];
    rollen.forEach((rolle) => {
        console.log(`📢 Nachricht an [${rolle.toUpperCase()}]: ${message}`);
    });
};
exports.sendNotification = sendNotification;
