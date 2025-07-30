// src/Middleware/kundenMiddleware.ts

import { Request, Response, NextFunction } from "express";

// Erlaubt Zugriff für Kunden oder deren Unteraccounts
export const kundenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user || (user.role !== "kunde" && user.role !== "unteraccount")) {
    return res
      .status(403)
      .json({ message: "Zugriff nur für Kunden oder Unteraccounts erlaubt" });
  }

  next();
};