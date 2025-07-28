import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../types/users';

const users: User[] = [
  {
    id: '1',
    username: 'admin',
    password: bcrypt.hashSync('pass123', 10),
    role: 'admin'
  },
  {
    id: '2',
    username: 'teamleiter',
    password: bcrypt.hashSync('pass456', 10),
    role: 'teamleiter'
  }
];

export function findUserByUsername(username: string): User | undefined {
  return users.find(user => user.username === username);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: User): string {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1h' }
  );
}