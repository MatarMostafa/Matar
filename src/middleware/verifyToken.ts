import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const geheimnis = 'mein-super-secret'; // solltest du später aus .env laden

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token fehlt oder ist ungültig' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, geheimnis);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token ungültig' });
  }
}