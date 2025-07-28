// src/routes/usersRoutes.ts

import express from "express";

const router = express.Router();

// Beispiel-Datenbank (ersetzt später durch echte DB)
const users = [
  { id: 1, name: "Max Mustermann", role: "Mitarbeiter" },
  { id: 2, name: "Erika Musterfrau", role: "Teamleiter" },
];

// Alle Benutzer abrufen
router.get("/", (req, res) => {
  res.json(users);
});

// Benutzer nach ID abrufen
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });
  res.json(user);
});

export default router;