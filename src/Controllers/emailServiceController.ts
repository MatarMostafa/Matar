import { Request, Response } from "express";
import { sendeEmailService } from "../Services/emailService";

export const sendeEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { empfaenger, betreff, nachricht } = req.body;

    if (!empfaenger || !betreff || !nachricht) {
      res.status(400).json({ error: "Alle Felder sind erforderlich." });
      return;
    }

    await sendeEmailService(empfaenger, betreff, nachricht);
    res.status(200).json({ message: "E-Mail erfolgreich gesendet." });
  } catch (error) {
    console.error("Fehler beim E-Mail-Versand:", error);
    res.status(500).json({ error: "Fehler beim Senden der E-Mail." });
  }
};