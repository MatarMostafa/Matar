"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const roleMiddleware_1 = require("../Middleware/roleMiddleware");
const zuweisungController_1 = require("../Controllers/zuweisungController");
const router = (0, express_1.Router)();
router.post("/automatisch", authMiddleware_1.authenticateToken, (0, roleMiddleware_1.authorizeRoles)(["admin", "teamleiter"]), zuweisungController_1.automatischeZuweisung);
exports.default = router;
