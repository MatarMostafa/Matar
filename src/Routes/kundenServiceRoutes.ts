import { Router } from "express";
import { authenticateToken } from "../Middleware/authMiddleware";
import { authorizeRoles } from "../Middleware/roleMiddleware";
import { getKundenUebersicht } from "../Controllers/kundenServiceController";

const router = Router();

router.get(
  "/",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  getKundenUebersicht
);

export default router;
