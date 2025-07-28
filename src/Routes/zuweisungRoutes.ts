// src/Routes/zuweisungRoutes.ts

import express from "express";
import { findePassendeMitarbeiter } from "../Services/zuweisungsService";

const router = express.Router();

// GET /api/zuweisung/vorschlaege/:auftragId
router.get("/vorschlaege/:auftragId", (req, res) => {
  const auftragId = parseInt(req.params.auftragId);
  if (isNaN(auftragId)) {
    return res.status(400).json({ message: "Ungültige Auftrags-ID" });
  }

  const mitarbeiterIds = findePassendeMitarbeiter(auftragId);
  res.json({ mitarbeiter: mitarbeiterIds });
});

export default router;
// src/Routes/zuweisungRoutes.ts

import express from "express";
import { auftraege } from "../data/auftraege";
import { users } from "../data/users";

const router = express.Router();

// PUT /api/zuweisung/:auftragId
router.put("/:auftragId", (req, res) => {
  const auftragId = parseInt(req.params.auftragId);
  const { mitarbeiterIds } = req.body;

  const auftrag = auftraege.find((a) => a.id === auftragId);
  if (!auftrag) {
    return res.status(404).json({ message: "Auftrag nicht gefunden" });
  }

  if (!Array.isArray(mitarbeiterIds)) {
    return res.status(400).json({ message: "mitarbeiterIds muss ein Array sein" });
  }

  // Überprüfen, ob die Mitarbeiter existieren
  const ungültigeIds = mitarbeiterIds.filter(
    (id) => !users.find((u) => u.id === id && u.role === "mitarbeiter")
  );

  if (ungültigeIds.length > 0) {
    return res.status(400).json({
      message: `Ungültige Mitarbeiter-IDs: ${ungültigeIds.join(", ")}`,
    });
  }

  auftrag.mitarbeiterIds = mitarbeiterIds;

  return res.json({ message: "Mitarbeiter erfolgreich zugewiesen", auftrag });
});

export default router;