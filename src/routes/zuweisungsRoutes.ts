import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { automatischeZuweisung } from "../controllers/zuweisungController";

const router = Router();

router.post(
  "/automatisch",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  automatischeZuweisung
);

export default router;
