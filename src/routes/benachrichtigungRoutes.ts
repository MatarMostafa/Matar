import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import {
  getBenachrichtigungen,
  createBenachrichtigung,
  deleteBenachrichtigung
} from "../controllers/benachrichtigungController";

const router = Router();

// Alle Benachrichtigungen abrufen
router.get(
  "/",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  getBenachrichtigungen
);

// Neue Benachrichtigung erstellen
router.post(
  "/",
  authenticateToken,
  authorizeRoles(["admin"]),
  createBenachrichtigung
);

// Benachrichtigung löschen
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  deleteBenachrichtigung
);

export default router;
