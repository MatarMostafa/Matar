// src/Middleware/errorHandler.ts

import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.status || 500;
  const message = err.message || "Interner Serverfehler";

  res.status(statusCode).json({
    success: false,
    message,
  });
};