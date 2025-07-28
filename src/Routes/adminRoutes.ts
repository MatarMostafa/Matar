import express from "express";
import {
  getSperrungen,
  entsperreMitarbeiter,
} from "../Controllers/AdminController";
import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";

const router = express.Router();

// Nur Admin darf das sehen
router.get(
  "/sperrungen",
  authMiddleware,
  roleMiddleware(["admin"]),
  getSperrungen
);

router.post(
  "/entsperren",
  authMiddleware,
  roleMiddleware(["admin"]),
  entsperreMitarbeiter
);

export default router;
import { getKundenStatistik } from "../Controllers/AdminController";

router.get(
  "/kundenstatistik",
  authMiddleware,
  roleMiddleware(["admin"]),
  getKundenStatistik
);
import { getDurchschnittMitarbeiter } from "../Controllers/AdminController";

router.get(
  "/durchschnitt-mitarbeiter",
  authMiddleware,
  roleMiddleware(["admin"]),
  getDurchschnittMitarbeiter
);
import { exportiereAuftraege } from "../Controllers/AdminController";

router.get(
  "/exportiere-auftraege",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraege
);
import { einsatzstundenProMitarbeiter } from "../Controllers/AdminController";

router.get(
  "/einsatzstunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  einsatzstundenProMitarbeiter
);
import { durchschnittswerte } from "../Controllers/AdminController";

router.get(
  "/durchschnittswerte",
  authMiddleware,
  roleMiddleware(["admin"]),
  durchschnittswerte
);
import { kundenMonatsstatistik } from "../Controllers/AdminController";

router.get(
  "/kundenstatistik",
  authMiddleware,
  roleMiddleware(["admin"]),
  kundenMonatsstatistik
);
import { gesamtauswertungMonat } from "../Controllers/AdminController";

router.get(
  "/monatsauswertung",
  authMiddleware,
  roleMiddleware(["admin"]),
  gesamtauswertungMonat
);
import { durchschnittlicherEinsatz } from "../Controllers/AdminController";

router.get(
  "/durchschnitt-einsatz",
  authMiddleware,
  roleMiddleware(["admin"]),
  durchschnittlicherEinsatz
);
import { geleisteteStunden } from "../Controllers/AdminController";

router.get(
  "/stunden-pro-mitarbeiter",
  authMiddleware,
  roleMiddleware(["admin"]),
  geleisteteStunden
);
import { auftraegeProKunde } from "../Controllers/AdminController";

router.get(
  "/auftraege-pro-kunde",
  authMiddleware,
  roleMiddleware(["admin"]),
  auftraegeProKunde
);
import { durchschnittlicheMitarbeiteranzahl } from "../Controllers/AdminController";

router.get(
  "/durchschnitt-mitarbeiter",
  authMiddleware,
  roleMiddleware(["admin"]),
  durchschnittlicheMitarbeiteranzahl
);
import { gesamteEinsatzzeit } from "../Controllers/AdminController";

router.get(
  "/gesamt-einsatzzeit",
  authMiddleware,
  roleMiddleware(["admin"]),
  gesamteEinsatzzeit
);
import { einsatzzeitProMitarbeiter } from "../Controllers/AdminController";

router.get(
  "/einsatzzeit-pro-mitarbeiter",
  authMiddleware,
  roleMiddleware(["admin"]),
  einsatzzeitProMitarbeiter
);
import { durchschnittswerte } from "../Controllers/AdminController";

router.get(
  "/durchschnittswerte",
  authMiddleware,
  roleMiddleware(["admin"]),
  durchschnittswerte
);
import { exportiereAuftraege } from "../Controllers/AdminController";

router.get(
  "/export",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraege
);
import { kundenStatistik } from "../Controllers/AdminController";

router.get(
  "/statistik/kunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  kundenStatistik
);
import { einsatzStatistik } from "../Controllers/AdminController";

router.get(
  "/statistik/einsaetze",
  authMiddleware,
  roleMiddleware(["admin"]),
  einsatzStatistik
);
import { exportiereAuftraege } from "../Controllers/AdminController";

router.get(
  "/export/auftraege",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraege
);
import { berechneDurchschnittswerte } from "../Controllers/AdminController";

router.get(
  "/statistik/durchschnitt",
  authMiddleware,
  roleMiddleware(["admin"]),
  berechneDurchschnittswerte
);
import { geleisteteStundenProMitarbeiter } from "../Controllers/AdminController";

router.get(
  "/statistik/stunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  geleisteteStundenProMitarbeiter
);
import { exportiereAuftraegeAlsCSV } from "../Controllers/AdminController";

router.get(
  "/export/csv",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraegeAlsCSV
);
import express from "express";
import { getBewertungen, entsperreMitarbeiter } from "../Controllers/AdminController";
import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";

const router = express.Router();

// Nur Admins erlaubt:
router.use(authMiddleware, roleMiddleware(["admin"]));

router.get("/bewertungen/:mitarbeiterId", getBewertungen);
router.delete("/entsperren/:mitarbeiterId/:kundenEmail", entsperreMitarbeiter);

export default router;
import express from "express";
import {
  getBewertungen,
  entsperreMitarbeiter
} from "../Controllers/AdminController";
import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";

const router = express.Router();

router.get(
  "/bewertungen/:mitarbeiterId",
  authMiddleware,
  roleMiddleware(["admin"]),
  getBewertungen
);

router.delete(
  "/entsperren/:mitarbeiterId/:kundenEmail",
  authMiddleware,
  roleMiddleware(["admin"]),
  entsperreMitarbeiter
);

export default router;
import express from "express";
import {
  getBewertungen,
  entsperreMitarbeiter
} from "../Controllers/AdminController";

import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";

const router = express.Router();

/* ──────────────────────────────
   Admin-Funktionen
──────────────────────────────── */

// (1) Bewertungen und Sperr-Infos zu einem Mitarbeiter
// GET /admin/bewertungen/:mitarbeiterId
router.get(
  "/bewertungen/:mitarbeiterId",
  authMiddleware,
  roleMiddleware(["admin"]),
  getBewertungen
);

// (2) Sperre eines Mitarbeiters für einen Kunden aufheben
// DELETE /admin/entsperren/:mitarbeiterId/:kundenEmail
router.delete(
  "/entsperren/:mitarbeiterId/:kundenEmail",
  authMiddleware,
  roleMiddleware(["admin"]),
  entsperreMitarbeiter
);

export default router;
import express from "express";
import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";
import { exportiereAuftraegeAlsCSV } from "../Controllers/AdminController";

const router = express.Router();

// CSV-Export (nur Admin)
router.get(
  "/export/csv",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraegeAlsCSV
);

export default router;
import { stundenProMitarbeiter } from "../Controllers/AdminController";

// Stundenauswertung (nur Admin)
router.get(
  "/statistik/stunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  stundenProMitarbeiter
);
import { durchschnittswerte } from "../Controllers/AdminController";

// Durchschnittswerte abrufen
router.get(
  "/statistik/durchschnitt",
  authMiddleware,
  roleMiddleware(["admin"]),
  durchschnittswerte
);
import { exportiereAuftraege } from "../Controllers/AdminController";

// Auftragsexport (z. B. für Buchhaltung)
router.get(
  "/export/auftraege",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraege
);
import { getStundenProMitarbeiter } from "../Controllers/AdminController";

// Übersicht: Arbeitsstunden pro Mitarbeiter
router.get(
  "/auswertung/stunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  getStundenProMitarbeiter
);
import { getDurchschnittswerte } from "../Controllers/AdminController";

// Durchschnittswerte anzeigen
router.get(
  "/auswertung/durchschnitt",
  authMiddleware,
  roleMiddleware(["admin"]),
  getDurchschnittswerte
);
import { getStundenUebersicht } from "../Controllers/AdminController";

// Route: Stundenübersicht pro Mitarbeiter
router.get(
  "/statistik/stunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  getStundenUebersicht
);
import { getDurchschnittswerte } from "../Controllers/AdminController";

// Durchschnittswerte: Mitarbeiter & Stunden
router.get(
  "/statistik/durchschnitt",
  authMiddleware,
  roleMiddleware(["admin"]),
  getDurchschnittswerte
);
import { exportiereAuftraege } from "../Controllers/AdminController";

// Export für Buchhaltung (CSV oder JSON)
router.get(
  "/export",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraege
);
import { geleisteteStundenProMitarbeiter } from "../Controllers/AdminController";

// Route: Geleistete Stunden pro Mitarbeiter
router.get(
  "/stunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  geleisteteStundenProMitarbeiter
);
// Mitarbeiter-Kategorie ändern
router.put(
  "/mitarbeiter/:id/kategorie",
  authMiddleware,
  roleMiddleware(["admin"]),
  setzeKategorie
);
// Manuell automatische Planung auslösen
router.post(
  "/planung/auto",
  authMiddleware,
  roleMiddleware(["admin"]),
  automatischEinplanen
);
import { getDurchschnittswerte } from "../Controllers/AdminController";

router.get(
  "/statistik/durchschnitt",
  authMiddleware,
  roleMiddleware(["admin"]),
  getDurchschnittswerte
);
import { getStundenProMitarbeiter } from "../Controllers/AdminController";

router.get(
  "/statistik/stunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  getStundenProMitarbeiter
);
import { getRotsperrungen } from "../Controllers/AdminController";

router.get(
  "/sperrungen/rot",
  authMiddleware,
  roleMiddleware(["admin"]),
  getRotsperrungen
);
import { exportiereAuftraegeCSV } from "../Controllers/AdminController";

router.get(
  "/export/csv",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraegeCSV
);
import { stundenProMitarbeiter } from "../Controllers/AdminController";

router.get(
  "/auswertung/stunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  stundenProMitarbeiter
);
import { sperreAufheben } from "../Controllers/AdminController";

// Nur Admins dürfen Sperrungen aufheben
router.post(
  "/sperre-aufheben",
  authMiddleware,
  roleMiddleware(["admin"]),
  sperreAufheben
);
// src/Controllers/AdminController.ts

import { Request, Response } from "express";
import { mitarbeiter } from "../data/mitarbeiter";

// Hilfsfunktion: zähle Bewertungen
function berechneBewertungen(mit: any) {
  const bewertungen = mit.bewertungen || [];

  const stats = {
    gesamt: bewertungen.length,
    gruen: 0,
    gelb: 0,
    rot: 0,
    kunden: [] as string[],
  };

  for (const bew of bewertungen) {
    if (bew.farbe === "grün") stats.gruen++;
    if (bew.farbe === "gelb") stats.gelb++;
    if (bew.farbe === "rot") stats.rot++;
    if (bew.kundeId) stats.kunden.push(bew.kundeId);
  }

  return stats;
}

// ───────────────────────────────
// Admin sieht Bewertungsauswertung zu einem Mitarbeiter
export const getMitarbeiterBewertungen = (req: Request, res: Response) => {
  const mitarbeiterId = req.params.id;
  const mit = mitarbeiter.find((m) => m.id === mitarbeiterId);

  if (!mit) {
    return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
  }

  const stats = berechneBewertungen(mit);
  res.json({
    mitarbeiterId,
    name: mit.name,
    bewertungen: stats,
  });
};
import { getMitarbeiterBewertungen } from "../Controllers/AdminController";

// Admin kann Bewertungen eines Mitarbeiters abrufen
router.get(
  "/bewertungen/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  getMitarbeiterBewertungen
);
import { getBewertungsUebersicht } from "../Controllers/AdminController";

// Admin sieht Übersicht aller Bewertungen
router.get(
  "/bewertungen",
  authMiddleware,
  roleMiddleware(["admin"]),
  getBewertungsUebersicht
);
import { exportiereAuftraegeCsv } from "../Controllers/AdminController";

router.get(
  "/export/auftraege",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraegeCsv
);
import express from "express";
import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";
import { getArbeitsstunden } from "../Controllers/AdminController";

const router = express.Router();

// Nur Admin darf
router.get(
  "/arbeitsstunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  getArbeitsstunden
);

export default router;
// src/Routes/adminRoutes.ts
import express from "express";
import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";
import { automatischePlanung } from "../Controllers/PlanungsController";
import { stundenUebersicht } from "../Controllers/StundenController";
import { exportiereAuftraege } from "../Controllers/ExportController";

const router = express.Router();

router.post("/planung", authMiddleware, roleMiddleware(["admin"]), automatischePlanung);
router.get("/stunden", authMiddleware, roleMiddleware(["admin"]), stundenUebersicht);
router.get("/export", authMiddleware, roleMiddleware(["admin"]), exportiereAuftraege);

export default router;
// src/Routes/adminRoutes.ts
import express from "express";
import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";
import {
  gibAdminStatistik,
  exportiereAuftraegeCSV,
  gibAlleSperrungen,
  adminEntsperreMitarbeiter,
  gibStundenProMitarbeiter,
  gibDurchschnittswerte
} from "../Controllers/AdminController";

const router = express.Router();

router.get(
  "/statistik",
  authMiddleware,
  roleMiddleware(["admin"]),
  gibAdminStatistik
);

router.get(
  "/export",
  authMiddleware,
  roleMiddleware(["admin"]),
  exportiereAuftraegeCSV
);

router.get(
  "/sperrungen",
  authMiddleware,
  roleMiddleware(["admin"]),
  gibAlleSperrungen
);

router.post(
  "/entsperren/:mitarbeiterId/:kundeId",
  authMiddleware,
  roleMiddleware(["admin"]),
  adminEntsperreMitarbeiter
);

router.get(
  "/stunden",
  authMiddleware,
  roleMiddleware(["admin"]),
  gibStundenProMitarbeiter
);

router.get(
  "/durchschnittswerte",
  authMiddleware,
  roleMiddleware(["admin"]),
  gibDurchschnittswerte
);

export default router;
// src/Routes/adminRoutes.ts

import express from "express";
import {
  entsperreMitarbeiter,
  sperreMitarbeiter,
  setzeFallbackMitarbeiter,
} from "../Controllers/adminController";

import { authMiddleware } from "../Middleware/authMiddleware";
import { checkRole } from "../Middleware/roleMiddleware";

const router = express.Router();

// Nur Admins dürfen Mitarbeiter sperren oder entsperren
router.post("/sperre/:id", authMiddleware, checkRole(["admin"]), sperreMitarbeiter);
router.post("/entsperre/:id", authMiddleware, checkRole(["admin"]), entsperreMitarbeiter);

// Nur Admins dürfen Fallback-Mitarbeiter setzen
router.post("/fallback/:auftragId/:fallbackMitarbeiterId", authMiddleware, checkRole(["admin"]), setzeFallbackMitarbeiter);

export default router;