import { Router } from "express";
import { authenticateToken } from "../Middleware/authMiddleware";
import { authorizeRoles } from "../Middleware/roleMiddleware";
import { automatischeZuweisung } from "../Controllers/zuweisungController";

const router = Router();

router.post(
  "/automatisch",
  authenticateToken,
  authorizeRoles(["admin", "teamleiter"]),
  automatischeZuweisung
);

export default router;
