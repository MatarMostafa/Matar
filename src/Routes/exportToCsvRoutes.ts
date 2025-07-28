import express, { Request, Response } from "express";
import { exportDataToCsv } from "../Services/exportToCsvService";

const router = express.Router();

// GET /api/export/csv
router.get("/", async (req: Request, res: Response) => {
  try {
    const csvBuffer = await exportDataToCsv();

    res.setHeader("Content-Disposition", "attachment; filename=export.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csvBuffer);
  } catch (error: any) {
    res.status(500).json({ message: "Export fehlgeschlagen", error: error.message });
  }
});

export default router;