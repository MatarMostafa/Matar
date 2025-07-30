import express from "express";
import { login, register } from "../Controllers/Authcontroller";

const router = express.Router();

// Route: /api/benutzer/login
router.post("/login", login);

// Route: /api/benutzer/register
router.post("/register", register);

export default router;
// Alle „roten“ Bewertungen anzeigen
router.get(
  "/sperrungen",
  authMiddleware,
  roleMiddleware(["admin"]),
  getSperrungen
);

// Mitarbeiter wieder freigeben (Admin)
router.post(
  "/entsperren",
  authMiddleware,
  roleMiddleware(["admin"]),
  entsperreMitarbeiter
);