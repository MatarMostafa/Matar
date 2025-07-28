"use strict";
// src/Middleware/adminMiddleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
// Middleware nur für Admins
const adminMiddleware = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Nur für Admins erlaubt" });
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
