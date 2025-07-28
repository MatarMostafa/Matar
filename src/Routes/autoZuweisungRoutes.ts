import express, { Request, Response } from "express";
import { automatischeZuweisung } from "../Utils/autoZuweisung";

const router = express.Router();

// POST /api/autoZuweisung
router.post("/", async (req: Request, res: Response) => {
  try {
    const result = await automatischeZuweisung(req.body);
    res.status(200).json({ message: "Automatische Zuweisung erfolgreich", result });
  } catch (error: any) {
    res.status(500).json({ message: "Fehler bei der automatischen Zuweisung", error: error.message });
  }
});

export default router;