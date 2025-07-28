"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendePush = void 0;
const sendePush = async (req, res) => {
    try {
        const { title, message, empfängerId } = req.body;
        // Simuliere Push-Logik (hier würdest du dein Push-Modul integrieren)
        console.log(`📲 Push an ${empfängerId}: ${title} - ${message}`);
        res.status(200).json({ message: 'Push gesendet' });
    }
    catch (error) {
        console.error('Fehler beim Push-Versand:', error);
        res.status(500).json({ error: 'Fehler beim Push-Versand' });
    }
};
exports.sendePush = sendePush;
