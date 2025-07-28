// src/Middleware/adminMiddleware.ts

import { Request, Response, NextFunction } from "express";

// Middleware nur für Admins
export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Nur für Admins erlaubt" });
  }

  next();
};