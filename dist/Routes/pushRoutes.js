"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pushService_1 = require("../Services/pushService");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/subscribe', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        await (0, pushService_1.saveSubscription)(req.body);
        res.status(200).json({ message: 'Abo gespeichert' });
    }
    catch (err) {
        res.status(500).json({ error: 'Fehler beim Speichern des Abos' });
    }
});
router.post('/notify', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        const { title, message } = req.body;
        await (0, pushService_1.sendPushNotification)(title, message);
        res.status(200).json({ message: 'Benachrichtigung gesendet' });
    }
    catch (err) {
        res.status(500).json({ error: 'Fehler beim Senden der Benachrichtigung' });
    }
});
exports.default = router;
