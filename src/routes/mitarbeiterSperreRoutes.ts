import express, { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = express.Router();

// Dummy-Sperrlogik – später kannst du echte Datenbankfunktionen nutzen
let gesperrteMitarbeiter: string[] = [];

/**
 * Mitarbeiter sperren
 */
router.post(
  "/sperren/:id",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  (req: Request, res: Response) => {
    const { id } = req.params;
    if (!gesperrteMitarbeiter.includes(id)) {
      gesperrteMitarbeiter.push(id);
    }
    res.status(200).json({ message: `Mitarbeiter ${id} wurde gesperrt.` });
  }
);

/**
 * Mitarbeiter entsperren
 */
router.post(
  "/entsperren/:id",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  (req: Request, res: Response) => {
    const { id } = req.params;
    gesperrteMitarbeiter = gesperrteMitarbeiter.filter(
      (mid) => mid !== id
    );
    res.status(200).json({ message: `Mitarbeiter ${id} wurde entsperrt.` });
  }
);

/**
 * Liste der gesperrten Mitarbeiter abrufen
 */
router.get(
  "/liste",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  (_req: Request, res: Response) => {
    res.status(200).json({ gesperrteMitarbeiter });
  }
);

export default router;
