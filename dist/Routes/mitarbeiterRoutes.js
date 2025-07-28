"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const roleMiddleware_1 = require("../Middleware/roleMiddleware");
const mitarbeiterController_1 = require("../Controllers/mitarbeiterController");
const router = (0, express_1.Router)();
// GET alle Mitarbeiter
router.get('/', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(['admin', 'teamleiter']), async (req, res) => {
    const result = await (0, mitarbeiterController_1.holeAlleMitarbeiter)(req, res);
    // Controller sendet Antwort direkt
});
// GET Mitarbeiter by ID
router.get('/:id', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(['admin', 'teamleiter']), async (req, res) => {
    const result = await (0, mitarbeiterController_1.holeMitarbeiterById)(req, res);
});
// POST neuer Mitarbeiter
router.post('/', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(['admin']), async (req, res) => {
    const result = await (0, mitarbeiterController_1.erstelleMitarbeiter)(req, res);
});
// PUT Mitarbeiter aktualisieren
router.put('/:id', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(['admin', 'teamleiter']), async (req, res) => {
    const result = await (0, mitarbeiterController_1.aktualisiereMitarbeiter)(req, res);
});
// DELETE Mitarbeiter löschen
router.delete('/:id', authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(['admin']), async (req, res) => {
    const result = await (0, mitarbeiterController_1.loescheMitarbeiter)(req, res);
});
exports.default = router;
