// src/Middleware/teamleiterMiddleware.ts

import { Request, Response, NextFunction } from "express";

// Nur Teamleiter dürfen diese Route aufrufen
export const teamleiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user || user.role !== "teamleiter") {
    return res.status(403).json({ message: "Nur für Teamleiter erlaubt" });
  }

  next();
};