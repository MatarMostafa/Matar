import express from "express";
import {
  getMitarbeiterStunden,
  getMitarbeiterEinsaetze,
  getAmpelStatistik
} from "../Controllers/StatistikController";

import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";

const router = express.Router();

// (1) Arbeitsstunden eines Mitarbeiters abrufen
// GET /statistik/stunden/:mitarbeiterId
router.get(
  "/stunden/:mitarbeiterId",
  authMiddleware,
  roleMiddleware(["admin"]),
  getMitarbeiterStunden
);

// (2) Einsätze eines Mitarbeiters abrufen
// GET /statistik/einsaetze/:mitarbeiterId
router.get(
  "/einsaetze/:mitarbeiterId",
  authMiddleware,
  roleMiddleware(["admin"]),
  getMitarbeiterEinsaetze
);

// (3) Ampelbewertungen (grün, gelb, rot) eines Mitarbeiters
// GET /statistik/ampel/:mitarbeiterId
router.get(
  "/ampel/:mitarbeiterId",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAmpelStatistik
);

export default router;