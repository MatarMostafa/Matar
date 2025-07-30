// src/Routes/urlaubRoutes.ts

import express from "express";
import {
  stelleUrlaubsantrag,
  genehmigeUrlaub,
  lehneUrlaubAb,
  getAlleUrlaubsantraege,
} from "../Controllers/urlaubController";

const router = express.Router();

// POST /api/urlaub
router.post("/", stelleUrlaubsantrag);

// GET /api/urlaub
router.get("/", getAlleUrlaubsantraege);

// PUT /api/urlaub/genehmigen/:id
router.put("/genehmigen/:id", genehmigeUrlaub);

// PUT /api/urlaub/ablehnen/:id
router.put("/ablehnen/:id", lehneUrlaubAb);

export default router;
// src/Routes/urlaubRoutes.ts

import express from "express";
import { getUrlaube, beantrageUrlaub, genehmigeUrlaub, lehneUrlaubAb } from "../Controllers/urlaubController";

const router = express.Router();

// Alle Urlaubsanträge abrufen
router.get("/", getUrlaube);

// Urlaub beantragen
router.post("/", beantrageUrlaub);

// Urlaub genehmigen
router.patch("/:id/genehmigen", genehmigeUrlaub);

// Urlaub ablehnen
router.patch("/:id/ablehnen", lehneUrlaubAb);

export default router;
// src/Routes/urlaubRoutes.ts

import express from "express";
import { urlaube } from "../data/urlaube";

const router = express.Router();

// Alle Urlaube abrufen
router.get("/", (_req, res) => {
  res.json(urlaube);
});

// Urlaub beantragen
router.post("/", (req, res) => {
  const { mitarbeiterId, von, bis, grund } = req.body;

  if (!mitarbeiterId || !von || !bis) {
    return res.status(400).json({ message: "Pflichtfelder fehlen." });
  }

  const neuerUrlaub = {
    id: urlaube.length + 1,
    mitarbeiterId,
    von,
    bis,
    grund,
    status: "beantragt",
  };

  urlaube.push(neuerUrlaub);
  res.status(201).json(neuerUrlaub);
});

// Urlaub aktualisieren (z. B. Status ändern)
router.put("/:id", (req, res) => {
  const urlaubId = parseInt(req.params.id);
  const index = urlaube.findIndex((u) => u.id === urlaubId);

  if (index === -1) {
    return res.status(404).json({ message: "Urlaub nicht gefunden." });
  }

  urlaube[index] = { ...urlaube[index], ...req.body };
  res.json(urlaube[index]);
});

// Urlaub löschen
router.delete("/:id", (req, res) => {
  const urlaubId = parseInt(req.params.id);
  const index = urlaube.findIndex((u) => u.id === urlaubId);

  if (index === -1) {
    return res.status(404).json({ message: "Urlaub nicht gefunden." });
  }

  urlaube.splice(index, 1);
  res.status(204).send();
});

export default router;