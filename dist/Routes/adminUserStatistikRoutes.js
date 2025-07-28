"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const roleMiddleware_1 = require("../Middleware/roleMiddleware");
const router = (0, express_1.Router)();
// Beispiel: Nutzerstatistik abrufen (Admin + Teamleiter)
router.get("/", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin", "teamleiter"]), async (_req, res) => {
    try {
        res.json({ message: "Nutzerstatistik geladen" });
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim Laden der Statistik" });
    }
});
// Beispiel: Admin-spezifische Statistik
router.get("/admin", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin"]), async (_req, res) => {
    try {
        res.json({ message: "Admin-Statistik geladen" });
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim Laden der Admin-Statistik" });
    }
});
exports.default = router;
