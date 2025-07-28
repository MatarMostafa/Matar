"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const roleMiddleware_1 = require("../Middleware/roleMiddleware");
const kundenServiceController_1 = require("../Controllers/kundenServiceController");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin", "teamleiter"]), kundenServiceController_1.getKundenUebersicht);
exports.default = router;
