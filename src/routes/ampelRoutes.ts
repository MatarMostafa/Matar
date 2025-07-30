// src/Routes/ampelRoutes.ts

import express from "express";
import { getAmpelStatus } from "../Controllers/ampelController";

const router = express.Router();

// GET /api/ampel
router.get("/", getAmpelStatus);

export default router;