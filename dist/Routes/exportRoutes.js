"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const roleMiddleware_1 = require("../Middleware/roleMiddleware");
const exportController_1 = require("../Controllers/exportController"); // Hinweis: existieren muss exportController.ts
const router = (0, express_1.Router)();
router.get("/json", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin", "teamleiter"]), exportController_1.exportiereJSON);
router.get("/csv", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin", "teamleiter"]), exportController_1.exportiereCSV);
router.get("/auftraege", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin"]), exportController_1.exportiereAuftraegeAlsCSV);
exports.default = router;
