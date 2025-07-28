import express, { Request, Response } from "express";
import {
  sendeBenachrichtigung,
  getBenachrichtigungenFuerNutzer,
  markiereAlsGelesen,
  deleteBenachrichtigung,
} from "../Controllers/benachrichtigungController";

const router = express.Router();

// Neue Benachrichtigung erstellen
router.post("/", (req: Request, res: Response) => {
  sendeBenachrichtigung(req, res);
});

// Alle Benachrichtigungen für einen Nutzer abrufen
router.get("/nutzer/:nutzerId", (req: Request, res: Response) => {
  getBenachrichtigungenFuerNutzer(req, res);
});

// Eine Benachrichtigung als gelesen markieren
router.put("/:id/gelesen", (req: Request, res: Response) => {
  markiereAlsGelesen(req, res);
});

// Eine Benachrichtigung löschen
router.delete("/:id", (req: Request, res: Response) => {
  deleteBenachrichtigung(req, res);
});

export default router;