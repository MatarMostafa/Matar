import express from "express";
import {
  getGesamtStatistik,
  getKundenStatistik,
  getStundenProMitarbeiter,
  exportiereAuftraege,
} from "../Controllers/StatistikController";

import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";

const router = express.Router();

// (1) Gesamtauswertung → nur Admin
router.get(
  "/gesamt",
  authMiddleware,
  roleMiddleware(["admin"]),
  getGesamtStatistik
);

// (2) Statistik für einen Kunden → nur Admin
router.get(
  "/kunde/:email",
  authMiddleware,
  roleMiddleware(["admin"]),
  getKundenStatistik
);

// (3) Stundenübersicht aller Mitarbeiter → nur Admin
router.get(
  "/stunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  getStundenProMitarbeiter
);

// (4) Auftragsexport → nur Admin
router.get(
  "/export",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraege
);

export default router;
import express from "express";
import { getAdminStatistik } from "../Controllers/StatistikController";
import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";

const router = express.Router();

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAdminStatistik
);

export default router;
// src/Routes/statistikRoutes.ts
import express from "express";
import { getMitarbeiterStunden } from "../Controllers/StatistikController";
import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";

const router = express.Router();

// Nur für Admin erlaubt
router.get(
  "/stunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  getMitarbeiterStunden
);

export default router;
router.get(
  "/durchschnitt",
  authMiddleware,
  roleMiddleware(["admin"]),
  getDurchschnittswerte
);
router.get(
  "/export/csv",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraegeCSV
);
// src/Routes/statistikRoutes.ts

import express from "express";
import { getGesamtStatistik } from "../Controllers/statistikController";

const router = express.Router();

router.get("/gesamt", getGesamtStatistik);

export default router;