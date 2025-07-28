"use strict";
// src/Middleware/teamleiterMiddleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamleiterMiddleware = void 0;
// Nur Teamleiter dürfen diese Route aufrufen
const teamleiterMiddleware = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== "teamleiter") {
        return res.status(403).json({ message: "Nur für Teamleiter erlaubt" });
    }
    next();
};
exports.teamleiterMiddleware = teamleiterMiddleware;
