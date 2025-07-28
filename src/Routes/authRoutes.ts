import express, { Request, Response, NextFunction } from 'express';
import { login } from '../Controllers/authController';

const router = express.Router();

// Login-Route
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  login(req, res).catch(next); // Fehler werden korrekt weitergegeben
});

export default router;