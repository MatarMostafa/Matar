// src/Routes/adminUserRoutes.ts

import express from "express";
import { users, User } from "../data/users";
import bcrypt from "bcryptjs";

const router = express.Router();

// 📄 Alle Benutzer abrufen
router.get("/", (_req, res) => {
  const alle = users.map(({ password, ...rest }) => rest);
  res.json(alle);
});

// ➕ Neuen Benutzer anlegen
router.post("/", (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Alle Felder erforderlich" });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: "Benutzer existiert bereits" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser: User = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    role,
  };

  users.push(newUser);

  res.status(201).json({ message: "Benutzer hinzugefügt", user: { id: newUser.id, email, role } });
});

// ✏️ Rolle ändern
router.put("/:id/rolle", (req, res) => {
  const id = parseInt(req.params.id);
  const { neueRolle } = req.body;

  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });

  user.role = neueRolle;
  res.json({ message: "Rolle geändert", user: { id: user.id, email: user.email, role: user.role } });
});

// 🔑 Passwort ändern
router.put("/:id/passwort", (req, res) => {
  const id = parseInt(req.params.id);
  const { neuesPasswort } = req.body;

  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });

  user.password = bcrypt.hashSync(neuesPasswort, 10);
  res.json({ message: "Passwort geändert" });
});

// ❌ Benutzer löschen
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) return res.status(404).json({ message: "Benutzer nicht gefunden" });

  users.splice(index, 1);
  res.json({ message: "Benutzer gelöscht" });
});

export default router;