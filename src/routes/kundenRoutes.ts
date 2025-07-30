// src/Routes/kundenRoutes.ts

import express from "express";
import {
  erstelleKunde,
  getAlleKunden,
  fuegeUnteraccountHinzu,
} from "../Services/kundenService";

const router = express.Router();

// GET /api/kunden
router.get("/", (_req, res) => {
  res.json(getAlleKunden());
});

// POST /api/kunden
router.post("/", (req, res) => {
  const { firmenname, email } = req.body;
  if (!firmenname || !email) {
    return res.status(400).json({ message: "Firmenname und E-Mail sind erforderlich" });
  }

  const kunde = erstelleKunde(firmenname, email);
  res.status(201).json(kunde);
});

// POST /api/kunden/:kundeId/unteraccount
router.post("/:kundeId/unteraccount", (req, res) => {
  const kundeId = parseInt(req.params.kundeId);
  const { name, email } = req.body;

  const unteraccount = fuegeUnteraccountHinzu(kundeId, name, email);
  if (!unteraccount) {
    return res.status(404).json({ message: "Kunde nicht gefunden" });
  }

  res.status(201).json(unteraccount);
});

export default router;
// src/Routes/kundenRoutes.ts

import express, { Request, Response } from "express";
import { findeUnteraccount, getUnteraccountsFuerKunde } from "../Services/kundenService";

const router = express.Router();

// POST /api/kunden/login-unteraccount
router.post("/login-unteraccount", (req: Request, res: Response) => {
  const { email, passwort } = req.body;
  const daten = findeUnteraccount(email, passwort);
  if (daten) {
    return res.status(200).json({
      message: "Login erfolgreich",
      kundeId: daten.kundeId,
      unteraccount: daten.unteraccount,
    });
  } else {
    return res.status(401).json({ message: "Login fehlgeschlagen" });
  }
});

// GET /api/kunden/:kundeId/unteraccounts
router.get("/:kundeId/unteraccounts", (req: Request, res: Response) => {
  const kundeId = parseInt(req.params.kundeId);
  const liste = getUnteraccountsFuerKunde(kundeId);
  res.json(liste);
});

export default router;