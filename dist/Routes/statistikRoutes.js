"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StatistikController_1 = require("../Controllers/StatistikController");
const authMiddleware_1 = require("../Utils/authMiddleware");
const roleMiddleware_1 = require("../Utils/roleMiddleware");
const router = express_1.default.Router();
// (1) Gesamtauswertung → nur Admin
router.get("/gesamt", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), StatistikController_1.getGesamtStatistik);
// (2) Statistik für einen Kunden → nur Admin
router.get("/kunde/:email", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), StatistikController_1.getKundenStatistik);
// (3) Stundenübersicht aller Mitarbeiter → nur Admin
router.get("/stunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), StatistikController_1.getStundenProMitarbeiter);
// (4) Auftragsexport → nur Admin
router.get("/export", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), StatistikController_1.exportiereAuftraege);
exports.default = router;
const StatistikController_2 = require("../Controllers/StatistikController");
const router = express_1.default.Router();
router.get("/admin", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), StatistikController_2.getAdminStatistik);
exports.default = router;
const StatistikController_3 = require("../Controllers/StatistikController");
const router = express_1.default.Router();
// Nur für Admin erlaubt
router.get("/stunden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), StatistikController_3.getMitarbeiterStunden);
exports.default = router;
router.get("/durchschnitt", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), getDurchschnittswerte);
router.get("/export/csv", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), exportiereAuftraegeCSV);
const router = express_1.default.Router();
router.get("/gesamt", StatistikController_1.getGesamtStatistik);
exports.default = router;
