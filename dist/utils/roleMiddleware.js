"use strict";
// src/Utils/roleMiddleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (erlaubteRollen) => {
    return (req, res, next) => {
        const benutzerRolle = req.user?.rolle;
        if (!benutzerRolle || !erlaubteRollen.includes(benutzerRolle)) {
            return res.status(403).json({ message: 'Zugriff verweigert – unzureichende Berechtigung.' });
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
