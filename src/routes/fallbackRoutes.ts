// src/Routes/fallbackRoutes.ts

import express from "express";
import { fallbackZuweisung } from "../Utils/fallbackSystem";

const router = express.Router();

// Manuell Fallback anstoßen
router.post("/", (req, res) => {
  const { datum } = req.body;

  if (!datum) {
    return res.status(400).json({ message: "Datum erforderlich" });
  }

  const ersetzt = fallbackZuweisung(datum);
  return res.json({ message: `✅ ${ersetzt} Ersatz-Zuweisungen durchgeführt.` });
});

export default router;
// src/Routes/fallbackRoutes.ts
import express from "express";
import { handleMitarbeiterAusfall } from "../Services/fallbackService";

const router = express.Router();

// POST /api/fallback/ausfall
router.post("/ausfall", handleMitarbeiterAusfall);

export default router;
// src/Routes/fallbackRoutes.ts

import express, { Request, Response } from "express";
import { findeErsatzMitarbeiter, setzeErsatzImAuftrag } from "../Services/fallbackService";

const router = express.Router();

// POST /api/fallback/ersetzen
router.post("/ersetzen", (req: Request, res: Response) => {
  const { auftragId, mitarbeiterId, datum, qualifikation } = req.body;

  if (!auftragId || !mitarbeiterId || !datum || !qualifikation) {
    return res.status(400).json({ message: "Alle Felder sind erforderlich" });
  }

  const ersatzId = findeErsatzMitarbeiter(mitarbeiterId, datum, qualifikation);
  if (!ersatzId) {
    return res.status(404).json({ message: "Kein Ersatzmitarbeiter gefunden" });
  }

  const gesetzt = setzeErsatzImAuftrag(auftragId, ersatzId);
  if (!gesetzt) {
    return res.status(500).json({ message: "Auftrag nicht gefunden oder Fehler beim Ersetzen" });
  }

  res.status(200).json({
    message: "Ersatzmitarbeiter erfolgreich zugewiesen",
    neuerMitarbeiterId: ersatzId,
  });
});

export default router;