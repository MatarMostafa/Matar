"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPush = void 0;
// src/Utils/PushService.ts
const sendPush = (userId, message) => {
    console.log(`📲 PUSH an ${userId}: ${message}`);
};
exports.sendPush = sendPush;
