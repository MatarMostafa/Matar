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
// (1) Arbeitsstunden eines Mitarbeiters abrufen
// GET /statistik/stunden/:mitarbeiterId
router.get("/stunden/:mitarbeiterId", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), StatistikController_1.getMitarbeiterStunden);
// (2) Einsätze eines Mitarbeiters abrufen
// GET /statistik/einsaetze/:mitarbeiterId
router.get("/einsaetze/:mitarbeiterId", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), StatistikController_1.getMitarbeiterEinsaetze);
// (3) Ampelbewertungen (grün, gelb, rot) eines Mitarbeiters
// GET /statistik/ampel/:mitarbeiterId
router.get("/ampel/:mitarbeiterId", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["admin"]), StatistikController_1.getAmpelStatistik);
exports.default = router;
