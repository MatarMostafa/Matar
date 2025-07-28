import { Router } from "express";
import { authenticateToken } from "../Middleware/authMiddleware";
import { authorizeRoles } from "../Middleware/roleMiddleware";
import {
  exportiereCSV,
  exportiereJSON,
  exportiereAuftraegeAlsCSV
} from "../Controllers/exportController"; // Hinweis: existieren muss exportController.ts

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
