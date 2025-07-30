// src/Routes/adminUserStatistikRoutes.ts

import express from "express";
import { Request, Response } from "express";
import { getAdminStatistik } from "../Services/adminStatistikService";
import { authMiddleware } from "../Middleware/authMiddleware";
import { roleMiddleware } from "../utils/roleMiddleware";

const router = express.Router();

// Nur Admin darf auf diese Route zugreifen
router.get("/admin/statistik", authMiddleware, roleMiddleware(["admin"]), async (req: Request, res: Response) => {
  try {
    const statistik = await getAdminStatistik();
    res.status(200).json(statistik);
  } catch (error) {
    console.error("Fehler beim Abrufen der Admin-Statistik:", error);
    res.status(500).json({ message: "Fehler beim Abrufen der Statistik" });
  }
});

export default router;