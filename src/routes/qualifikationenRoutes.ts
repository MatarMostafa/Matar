import express from "express";
import { getAlleQualifikationen, addQualifikation, deleteQualifikation } from "../services/qualifikationService";

const router = express.Router();

// Alle Qualifikationen abrufen
router.get("/", getAlleQualifikationen);

// Neue Qualifikation hinzufügen
router.post("/", addQualifikation);

// Qualifikation löschen
router.delete("/:id", deleteQualifikation);

export default router;
import express from "express";
import {
  getAlleQualifikationen,
  addQualifikation,
  deleteQualifikation,
} from "../services/qualifikationService";

const router = express.Router();

router.get("/", getAlleQualifikationen);
router.post("/", addQualifikation);
router.delete("/:id", deleteQualifikation);

export default router;
// src/Routes/qualifikationenRoutes.ts

import express from "express";
import { getAlleQualifikationen } from "../Controllers/qualifikationController";

const router = express.Router();

router.get("/", getAlleQualifikationen);

export default router;