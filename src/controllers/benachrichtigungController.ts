import { Request, Response } from "express";
import {
  createBenachrichtigung as createBenachrichtigungService,
  getBenachrichtigungen as getBenachrichtigungenService,
  deleteBenachrichtigung as deleteBenachrichtigungService
} from "../Services/benachrichtigungService";

// Alle Benachrichtigungen abrufen
export const getBenachrichtigungen = async (_req: Request, res: Response): Promise<void> => {
  try {
    const benachrichtigungen = await getBenachrichtigungenService();
    res.json(benachrichtigungen);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Benachrichtigungen" });
  }
};

// Neue Benachrichtigung erstellen
export const createBenachrichtigung = async (req: Request, res: Response): Promise<void> => {
  try {
    const neueBenachrichtigung = await createBenachrichtigungService(req.body);
    res.status(201).json(neueBenachrichtigung);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Erstellen der Benachrichtigung" });
  }
};

// Benachrichtigung löschen
export const deleteBenachrichtigung = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteBenachrichtigungService(req.params.id);
    res.json({ message: "Benachrichtigung gelöscht" });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Löschen der Benachrichtigung" });
  }
};
