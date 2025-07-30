import { Router } from "express";
import {
  bewerteMitarbeiter,
  getBewertungenFuerAdmin,
  getBewertungenFuerKunde,
  mitarbeiterWiederFreigeben
} from "../Controllers/bewertungController";
import { verifyToken } from "../Middleware/authMiddleware";

const router = Router();

// Bewertung abgeben (Kunde)
router.post("/bewerten", verifyToken, bewerteMitarbeiter);

// Bewertungen abrufen
router.get("/admin", verifyToken, getBewertungenFuerAdmin);
router.get("/kunde", verifyToken, getBewertungenFuerKunde);

// Mitarbeiter wieder freigeben
router.post("/freigeben", verifyToken, mitarbeiterWiederFreigeben);

export default router;
// src/Routes/bewertungRoutes.ts

import express from "express";
import { setBewertung, getBewertungen } from "../Controllers/bewertungController";

const router = express.Router();

router.post("/", setBewertung);         // POST /api/bewertung
router.get("/", getBewertungen);        // GET  /api/bewertung

export default router;
import express from "express";
import { erstelleBewertung, holeBewertungen } from "../Controllers/bewertungController";

const router = express.Router();

router.post("/", erstelleBewertung);
router.get("/", holeBewertungen);

export default router;