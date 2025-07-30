import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { getKundenUebersicht } from "../controllers/kundenServiceController";

const router = Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  getKundenUebersicht
);

export default router;
