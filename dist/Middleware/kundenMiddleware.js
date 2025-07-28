"use strict";
// src/Middleware/kundenMiddleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.kundenMiddleware = void 0;
// Erlaubt Zugriff für Kunden oder deren Unteraccounts
const kundenMiddleware = (req, res, next) => {
    const user = req.user;
    if (!user || (user.role !== "kunde" && user.role !== "unteraccount")) {
        return res
            .status(403)
            .json({ message: "Zugriff nur für Kunden oder Unteraccounts erlaubt" });
    }
    next();
};
exports.kundenMiddleware = kundenMiddleware;
