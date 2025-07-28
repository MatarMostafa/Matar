"use strict";
// src/Utils/authMiddleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    // Simulierte Authentifizierung – ersetzt dies später mit echter JWT-Prüfung
    req.user = { id: '123', rolle: 'admin' }; // Dummy-Benutzer
    next();
};
exports.authMiddleware = authMiddleware;
