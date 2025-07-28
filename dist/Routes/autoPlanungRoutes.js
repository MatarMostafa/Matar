"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const roleMiddleware_1 = require("../Middleware/roleMiddleware");
const router = (0, express_1.Router)();
// Beispiel: Auto-Planung starten
router.post('/start', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(['admin', 'teamleiter']), async (req, res) => {
    try {
        // Hier kommt deine Auto-Planungslogik rein
        res.json({ message: 'Auto-Planung erfolgreich gestartet' });
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler bei Auto-Planung' });
    }
});
exports.default = router;
