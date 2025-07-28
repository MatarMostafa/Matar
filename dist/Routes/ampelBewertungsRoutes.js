"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const roleMiddleware_1 = require("../Middleware/roleMiddleware");
const router = (0, express_1.Router)();
// Beispiel-Endpunkt: Ampelbewertung erstellen
router.post('/create', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(['admin', 'teamleiter']), async (req, res) => {
    try {
        res.json({ message: 'Ampelbewertung erstellt' });
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler bei Erstellung' });
    }
});
// Beispiel-Endpunkt: Ampelbewertung aktualisieren
router.put('/update/:id', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(['admin', 'teamleiter']), async (req, res) => {
    try {
        res.json({ message: `Ampelbewertung ${req.params.id} aktualisiert` });
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler bei Aktualisierung' });
    }
});
// Beispiel-Endpunkt: Ampelbewertung löschen
router.delete('/delete/:id', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(['admin', 'teamleiter']), async (req, res) => {
    try {
        res.json({ message: `Ampelbewertung ${req.params.id} gelöscht` });
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler beim Löschen' });
    }
});
// Beispiel-Endpunkt: Nur Admin
router.get('/admin-only', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(['admin']), async (_req, res) => {
    try {
        res.json({ message: 'Admin-Bereich erfolgreich geladen' });
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler im Admin-Bereich' });
    }
});
exports.default = router;
