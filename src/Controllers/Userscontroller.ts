// src/Controllers/UserController.ts

import { Request, Response } from "express";
import { users } from "../data/users";
import bcrypt from "bcryptjs";

// Dummy-Datenliste mutieren (normalerweise Datenbank)
let userList = [...users];

// GET /api/users
export const getAllUsers = (_req: Request, res: Response) => {
  res.json(userList);
};

// GET /api/users/:id
export const getUserById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = userList.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });
  res.json(user);
};

// POST /api/users
export const createUser = (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Alle Felder (email, password, role) sind erforderlich." });
  }

  const exists = userList.find(u => u.email === email);
  if (exists) {
    return res.status(409).json({ message: "Benutzer existiert bereits." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: userList.length + 1,
    email,
    password: hashedPassword,
    role,
  };

  userList.push(newUser);
  res.status(201).json(newUser);
};

// PUT /api/users/:id
export const updateUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = userList.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });

  const { email, password, role } = req.body;

  if (email) user.email = email;
  if (role) user.role = role;
  if (password) {
    user.password = bcrypt.hashSync(password, 10);
  }

  res.json({ message: "Benutzer aktualisiert", user });
};

// DELETE /api/users/:id
export const deleteUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = userList.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: "Benutzer nicht gefunden" });

  userList.splice(index, 1);
  res.json({ message: "Benutzer gelöscht" });
};