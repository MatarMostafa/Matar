"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const roleMiddleware_1 = require("../Middleware/roleMiddleware");
const benachrichtigungController_1 = require("../Controllers/benachrichtigungController");
const router = (0, express_1.Router)();
// Alle Benachrichtigungen abrufen
router.get("/", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin", "teamleiter"]), benachrichtigungController_1.getBenachrichtigungen);
// Neue Benachrichtigung erstellen
router.post("/", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin"]), benachrichtigungController_1.createBenachrichtigung);
// Benachrichtigung löschen
router.delete("/:id", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin"]), benachrichtigungController_1.deleteBenachrichtigung);
exports.default = router;
