// src/Routes/sperreRoutes.ts

import express from "express";
import { getSperrstatus, sperren, entsperren } from "../Controllers/sperreController";

const router = express.Router();

// Alle Sperrstatus abrufen
router.get("/", getSperrstatus);

// Mitarbeiter sperren
router.post("/sperren", sperren);

// Mitarbeiter entsperren
router.post("/entsperren", entsperren);

export default router;