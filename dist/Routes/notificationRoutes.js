"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const roleMiddleware_1 = require("../Middleware/roleMiddleware");
const router = (0, express_1.Router)();
// Beispiel: Alle Benachrichtigungen abrufen
router.get("/", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin", "teamleiter"]), async (req, res) => {
    try {
        res.json({ message: "Alle Benachrichtigungen geladen" });
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim Laden der Benachrichtigungen" });
    }
});
// Beispiel: Einzelne Benachrichtigung abrufen
router.get("/:id", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin", "teamleiter"]), async (req, res) => {
    try {
        res.json({ message: `Benachrichtigung ${req.params.id} geladen` });
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim Laden der Benachrichtigung" });
    }
});
// Beispiel: Benachrichtigung für User erstellen
router.post("/", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin"]), async (req, res) => {
    try {
        res.status(201).json({ message: "Benachrichtigung erstellt" });
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim Erstellen der Benachrichtigung" });
    }
});
exports.default = router;
