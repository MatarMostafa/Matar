import { Request, Response, NextFunction, RequestHandler } from 'express';

export const automatischeEinsatzplanungHandler: RequestHandler = async (req, res, next) => {
  try {
    // Dummy-Rückgabe
    res.status(200).json({ message: 'Automatische Einsatzplanung durchgeführt' });
  } catch (error) {
    next(error);
  }
};