"use strict";
// src/Routes/adminUserStatistikRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminStatistikService_1 = require("../Services/adminStatistikService");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const roleMiddleware_1 = require("../utils/roleMiddleware");
const router = express_1.default.Router();
// Nur Admin darf auf diese Route zugreifen
router.get("/admin/statistik", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), async (req, res) => {
    try {
        const statistik = await (0, adminStatistikService_1.getAdminStatistik)();
        res.status(200).json(statistik);
    }
    catch (error) {
        console.error("Fehler beim Abrufen der Admin-Statistik:", error);
        res.status(500).json({ message: "Fehler beim Abrufen der Statistik" });
    }
});
exports.default = router;
