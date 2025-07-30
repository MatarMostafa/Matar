import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import {
  exportiereCSV,
  exportiereJSON,
  exportiereAuftraegeAlsCSV
} from "../controllers/exportController"; // Hinweis: existieren muss exportController.ts

const router = Router();

router.get(
  "/json",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  exportiereJSON
);

router.get(
  "/csv",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  exportiereCSV
);

router.get(
  "/auftraege",
  authenticateToken,
  authorizeRoles(["admin"]),
  exportiereAuftraegeAlsCSV
);

export default router;
