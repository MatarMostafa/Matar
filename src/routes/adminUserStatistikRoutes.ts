import { Router, Request, Response } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();

// Beispiel: Nutzerstatistik abrufen (Admin + Teamleiter)
router.get(
  "/",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  async (_req: Request, res: Response): Promise<void> => {
    try {
      res.json({ message: "Nutzerstatistik geladen" });
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Laden der Statistik" });
    }
  }
);

// Beispiel: Admin-spezifische Statistik
router.get(
  "/admin",
  authenticateToken,
  authorizeRoles(["admin"]),
  async (_req: Request, res: Response): Promise<void> => {
    try {
      res.json({ message: "Admin-Statistik geladen" });
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Laden der Admin-Statistik" });
    }
  }
);

export default router;
