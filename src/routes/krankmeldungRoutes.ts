// src/Routes/krankmeldungRoutes.ts

import express from "express";
import { meldeKrankheit, getKrankmeldungen } from "../Controllers/krankmeldungController";

const router = express.Router();

router.post("/melden", meldeKrankheit);
router.get("/", getKrankmeldungen);

export default router;