import { Router, Request, Response } from "express";
import { authenticateToken } from "../Middleware/authMiddleware";
import { authorizeRoles } from "../Middleware/roleMiddleware";

const router = Router();

// Beispiel: Alle Benachrichtigungen abrufen
router.get(
  "/",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({ message: "Alle Benachrichtigungen geladen" });
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Laden der Benachrichtigungen" });
    }
  }
);

// Beispiel: Einzelne Benachrichtigung abrufen
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({ message: `Benachrichtigung ${req.params.id} geladen` });
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Laden der Benachrichtigung" });
    }
  }
);

// Beispiel: Benachrichtigung für User erstellen
router.post(
  "/",
  authenticateToken,
  authorizeRoles(["admin"]),
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(201).json({ message: "Benachrichtigung erstellt" });
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Erstellen der Benachrichtigung" });
    }
  }
);

export default router;
