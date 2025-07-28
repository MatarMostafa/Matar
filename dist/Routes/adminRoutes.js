"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMitarbeiterBewertungen = void 0;
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../Controllers/AdminController");
const authMiddleware_1 = require("../Utils/authMiddleware");
const roleMiddleware_1 = require("../Utils/roleMiddleware");
const router = express_1.default.Router();
// Nur Admin darf das sehen
router.get("/sperrungen", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_1.getSperrungen);
router.post("/entsperren", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_1.entsperreMitarbeiter);
exports.default = router;
const AdminController_2 = require("../Controllers/AdminController");
router.get("/kundenstatistik", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_2.getKundenStatistik);
const AdminController_3 = require("../Controllers/AdminController");
router.get("/durchschnitt-mitarbeiter", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_3.getDurchschnittMitarbeiter);
const AdminController_4 = require("../Controllers/AdminController");
router.get("/exportiere-auftraege", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_4.exportiereAuftraege);
const AdminController_5 = require("../Controllers/AdminController");
router.get("/einsatzstunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_5.einsatzstundenProMitarbeiter);
const AdminController_6 = require("../Controllers/AdminController");
router.get("/durchschnittswerte", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_6.durchschnittswerte);
const AdminController_7 = require("../Controllers/AdminController");
router.get("/kundenstatistik", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_7.kundenMonatsstatistik);
const AdminController_8 = require("../Controllers/AdminController");
router.get("/monatsauswertung", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_8.gesamtauswertungMonat);
const AdminController_9 = require("../Controllers/AdminController");
router.get("/durchschnitt-einsatz", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_9.durchschnittlicherEinsatz);
const AdminController_10 = require("../Controllers/AdminController");
router.get("/stunden-pro-mitarbeiter", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_10.geleisteteStunden);
const AdminController_11 = require("../Controllers/AdminController");
router.get("/auftraege-pro-kunde", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_11.auftraegeProKunde);
const AdminController_12 = require("../Controllers/AdminController");
router.get("/durchschnitt-mitarbeiter", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_12.durchschnittlicheMitarbeiteranzahl);
const AdminController_13 = require("../Controllers/AdminController");
router.get("/gesamt-einsatzzeit", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_13.gesamteEinsatzzeit);
const AdminController_14 = require("../Controllers/AdminController");
router.get("/einsatzzeit-pro-mitarbeiter", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_14.einsatzzeitProMitarbeiter);
router.get("/durchschnittswerte", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_6.durchschnittswerte);
router.get("/export", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_4.exportiereAuftraege);
const AdminController_15 = require("../Controllers/AdminController");
router.get("/statistik/kunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_15.kundenStatistik);
const AdminController_16 = require("../Controllers/AdminController");
router.get("/statistik/einsaetze", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_16.einsatzStatistik);
router.get("/export/auftraege", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_4.exportiereAuftraege);
const AdminController_17 = require("../Controllers/AdminController");
router.get("/statistik/durchschnitt", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_17.berechneDurchschnittswerte);
const AdminController_18 = require("../Controllers/AdminController");
router.get("/statistik/stunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_18.geleisteteStundenProMitarbeiter);
const AdminController_19 = require("../Controllers/AdminController");
router.get("/export/csv", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_19.exportiereAuftraegeAlsCSV);
const AdminController_20 = require("../Controllers/AdminController");
const router = express_1.default.Router();
// Nur Admins erlaubt:
router.use(authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]));
router.get("/bewertungen/:mitarbeiterId", AdminController_20.getBewertungen);
router.delete("/entsperren/:mitarbeiterId/:kundenEmail", AdminController_1.entsperreMitarbeiter);
exports.default = router;
const router = express_1.default.Router();
router.get("/bewertungen/:mitarbeiterId", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_20.getBewertungen);
router.delete("/entsperren/:mitarbeiterId/:kundenEmail", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_1.entsperreMitarbeiter);
exports.default = router;
const router = express_1.default.Router();
/* ──────────────────────────────
   Admin-Funktionen
──────────────────────────────── */
// (1) Bewertungen und Sperr-Infos zu einem Mitarbeiter
// GET /admin/bewertungen/:mitarbeiterId
router.get("/bewertungen/:mitarbeiterId", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_20.getBewertungen);
// (2) Sperre eines Mitarbeiters für einen Kunden aufheben
// DELETE /admin/entsperren/:mitarbeiterId/:kundenEmail
router.delete("/entsperren/:mitarbeiterId/:kundenEmail", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_1.entsperreMitarbeiter);
exports.default = router;
const router = express_1.default.Router();
// CSV-Export (nur Admin)
router.get("/export/csv", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_19.exportiereAuftraegeAlsCSV);
exports.default = router;
const AdminController_21 = require("../Controllers/AdminController");
// Stundenauswertung (nur Admin)
router.get("/statistik/stunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_21.stundenProMitarbeiter);
// Durchschnittswerte abrufen
router.get("/statistik/durchschnitt", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_6.durchschnittswerte);
// Auftragsexport (z. B. für Buchhaltung)
router.get("/export/auftraege", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_4.exportiereAuftraege);
const AdminController_22 = require("../Controllers/AdminController");
// Übersicht: Arbeitsstunden pro Mitarbeiter
router.get("/auswertung/stunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_22.getStundenProMitarbeiter);
const AdminController_23 = require("../Controllers/AdminController");
// Durchschnittswerte anzeigen
router.get("/auswertung/durchschnitt", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_23.getDurchschnittswerte);
const AdminController_24 = require("../Controllers/AdminController");
// Route: Stundenübersicht pro Mitarbeiter
router.get("/statistik/stunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_24.getStundenUebersicht);
// Durchschnittswerte: Mitarbeiter & Stunden
router.get("/statistik/durchschnitt", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_23.getDurchschnittswerte);
// Export für Buchhaltung (CSV oder JSON)
router.get("/export", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_4.exportiereAuftraege);
// Route: Geleistete Stunden pro Mitarbeiter
router.get("/stunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_18.geleisteteStundenProMitarbeiter);
// Mitarbeiter-Kategorie ändern
router.put("/mitarbeiter/:id/kategorie", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), setzeKategorie);
// Manuell automatische Planung auslösen
router.post("/planung/auto", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), automatischEinplanen);
router.get("/statistik/durchschnitt", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_23.getDurchschnittswerte);
router.get("/statistik/stunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_22.getStundenProMitarbeiter);
const AdminController_25 = require("../Controllers/AdminController");
router.get("/sperrungen/rot", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_25.getRotsperrungen);
const AdminController_26 = require("../Controllers/AdminController");
router.get("/export/csv", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_26.exportiereAuftraegeCSV);
router.get("/auswertung/stunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_21.stundenProMitarbeiter);
const AdminController_27 = require("../Controllers/AdminController");
// Nur Admins dürfen Sperrungen aufheben
router.post("/sperre-aufheben", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_27.sperreAufheben);
const mitarbeiter_1 = require("../data/mitarbeiter");
// Hilfsfunktion: zähle Bewertungen
function berechneBewertungen(mit) {
    const bewertungen = mit.bewertungen || [];
    const stats = {
        gesamt: bewertungen.length,
        gruen: 0,
        gelb: 0,
        rot: 0,
        kunden: [],
    };
    for (const bew of bewertungen) {
        if (bew.farbe === "grün")
            stats.gruen++;
        if (bew.farbe === "gelb")
            stats.gelb++;
        if (bew.farbe === "rot")
            stats.rot++;
        if (bew.kundeId)
            stats.kunden.push(bew.kundeId);
    }
    return stats;
}
// ───────────────────────────────
// Admin sieht Bewertungsauswertung zu einem Mitarbeiter
const getMitarbeiterBewertungen = (req, res) => {
    const mitarbeiterId = req.params.id;
    const mit = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
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
exports.getMitarbeiterBewertungen = getMitarbeiterBewertungen;
const AdminController_28 = require("../Controllers/AdminController");
// Admin kann Bewertungen eines Mitarbeiters abrufen
router.get("/bewertungen/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), exports.getMitarbeiterBewertungen);
const AdminController_29 = require("../Controllers/AdminController");
// Admin sieht Übersicht aller Bewertungen
router.get("/bewertungen", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_29.getBewertungsUebersicht);
const AdminController_30 = require("../Controllers/AdminController");
router.get("/export/auftraege", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_30.exportiereAuftraegeCsv);
const AdminController_31 = require("../Controllers/AdminController");
const router = express_1.default.Router();
// Nur Admin darf
router.get("/arbeitsstunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_31.getArbeitsstunden);
exports.default = router;
const PlanungsController_1 = require("../Controllers/PlanungsController");
const StundenController_1 = require("../Controllers/StundenController");
const router = express_1.default.Router();
router.post("/planung", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), PlanungsController_1.automatischePlanung);
router.get("/stunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), StundenController_1.stundenUebersicht);
router.get("/export", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_4.exportiereAuftraege);
exports.default = router;
const AdminController_32 = require("../Controllers/AdminController");
const router = express_1.default.Router();
router.get("/statistik", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_32.gibAdminStatistik);
router.get("/export", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_26.exportiereAuftraegeCSV);
router.get("/sperrungen", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_32.gibAlleSperrungen);
router.post("/entsperren/:mitarbeiterId/:kundeId", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_32.adminEntsperreMitarbeiter);
router.get("/stunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_32.gibStundenProMitarbeiter);
router.get("/durchschnittswerte", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), AdminController_32.gibDurchschnittswerte);
exports.default = router;
const adminController_1 = require("../Controllers/adminController");
const roleMiddleware_2 = require("../Middleware/roleMiddleware");
const router = express_1.default.Router();
// Nur Admins dürfen Mitarbeiter sperren oder entsperren
router.post("/sperre/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_2.checkRole)(["admin"]), adminController_1.sperreMitarbeiter);
router.post("/entsperre/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_2.checkRole)(["admin"]), AdminController_1.entsperreMitarbeiter);
// Nur Admins dürfen Fallback-Mitarbeiter setzen
router.post("/fallback/:auftragId/:fallbackMitarbeiterId", authMiddleware_1.authMiddleware, (0, roleMiddleware_2.checkRole)(["admin"]), adminController_1.setzeFallbackMitarbeiter);
exports.default = router;
