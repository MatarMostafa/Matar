// src/Utils/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Simulierte Authentifizierung – ersetzt dies später mit echter JWT-Prüfung
  req.user = { id: '123', rolle: 'admin' }; // Dummy-Benutzer
  next();
};