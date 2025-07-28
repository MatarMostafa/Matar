// src/Utils/roleMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (erlaubteRollen: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const benutzerRolle = req.user?.rolle;
    if (!benutzerRolle || !erlaubteRollen.includes(benutzerRolle)) {
      return res.status(403).json({ message: 'Zugriff verweigert – unzureichende Berechtigung.' });
    }
    next();
  };
};