import { Request, Response } from 'express';
import { findUserByUsername, verifyPassword, generateToken } from '../Services/authService';
import { User } from '../types/users';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Benutzer nicht gefunden' });
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Ungültiges Passwort' });
  }

  const token = generateToken(user);
  res.status(200).json({ token, user: { id: user.id, username: user.username, role: user.role } });
};