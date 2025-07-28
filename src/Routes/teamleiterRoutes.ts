import express from "express";
import { getTeamleiter, updateTeamleiter, deleteTeamleiter } from "../services/teamleiterService";

const router = express.Router();

// Alle Teamleiter abrufen
router.get("/", getTeamleiter);

// Teamleiter aktualisieren
router.put("/:id", updateTeamleiter);

// Teamleiter löschen
router.delete("/:id", deleteTeamleiter);

export default router;
import { Request, Response } from "express";

let teamleiter: any[] = [];

export const getTeamleiter = (req: Request, res: Response) => {
  res.json(teamleiter);
};

export const updateTeamleiter = (req: Request, res: Response) => {
  const index = teamleiter.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Nicht gefunden" });
  teamleiter[index] = { ...teamleiter[index], ...req.body };
  res.json(teamleiter[index]);
};

export const deleteTeamleiter = (req: Request, res: Response) => {
  const index = teamleiter.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Nicht gefunden" });
  teamleiter.splice(index, 1);
  res.status(204).send();
};
import express from "express";
import {
  getTeamleiter,
  updateTeamleiter,
  deleteTeamleiter,
} from "../services/teamleiterService";

const router = express.Router();

router.get("/", getTeamleiter);
router.put("/:id", updateTeamleiter);
router.delete("/:id", deleteTeamleiter);

export default router;
// src/Routes/teamleiterRoutes.ts

import express from "express";
import {
  getAuftraegeFuerTeamleiter,
  rueckmeldungGeben,
  auftragFreigeben,
  auftragEskalieren
} from "../Controllers/teamleiterController";

const router = express.Router();

// Aufträge für Teamleiter anzeigen
router.get("/:teamleiterId", getAuftraegeFuerTeamleiter);

// Rückmeldung zu einem Auftrag geben
router.post("/:auftragId/rueckmeldung", rueckmeldungGeben);

// Auftrag freigeben
router.post("/:auftragId/freigeben", auftragFreigeben);

// Auftrag eskalieren
router.post("/:auftragId/eskalieren", auftragEskalieren);

export default router;
// src/Routes/teamleiterRoutes.ts

import express from "express";
import { getZugewieseneAuftraege, rueckmeldungGeben } from "../Controllers/teamleiterController";
import { authMiddleware } from "../Middleware/authMiddleware";

const router = express.Router();

// Alle Aufträge, die einem Teamleiter zugewiesen sind
router.get("/auftraege", authMiddleware, getZugewieseneAuftraege);

// Rückmeldung zu einem Auftrag durch Teamleiter
router.post("/auftraege/:id/rueckmeldung", authMiddleware, rueckmeldungGeben);

export default router;
// src/Routes/teamleiterRoutes.ts

import express from "express";
import {
  erstelleTeamleiter,
  getAlleTeamleiter,
  weiseTeamleiterZuKunde,
} from "../Services/teamleiterService";

const router = express.Router();

// GET /api/teamleiter
router.get("/", (_req, res) => {
  res.json(getAlleTeamleiter());
});

// POST /api/teamleiter
router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name und E-Mail erforderlich" });
  }

  const neuerTL = erstelleTeamleiter(name, email);
  res.status(201).json(neuerTL);
});

// POST /api/teamleiter/:id/kunde/:kundenId
router.post("/:id/kunde/:kundenId", (req, res) => {
  const teamleiterId = parseInt(req.params.id);
  const kundenId = parseInt(req.params.kundenId);

  const erfolgreich = weiseTeamleiterZuKunde(teamleiterId, kundenId);
  if (!erfolgreich) {
    return res.status(404).json({ message: "Teamleiter nicht gefunden" });
  }

  res.json({ message: "Zuweisung erfolgreich" });
});

export default router;