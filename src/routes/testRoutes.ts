import express from "express";
import { verifyToken } from "../Middleware/verifyToken";

const router = express.Router();

// Einfache Diagnose-Route, nur für eingeloggte Nutzer
router.get("/token", verifyToken, (req: any, res) => {
  res.json({
    message: "Token ist gültig",
    userId: req.user.id,
    role: req.user.role,
  });
});

export default router;