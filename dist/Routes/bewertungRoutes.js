"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bewertungController_1 = require("../Controllers/bewertungController");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const router = (0, express_1.Router)();
// Bewertung abgeben (Kunde)
router.post("/bewerten", authMiddleware_1.verifyToken, bewertungController_1.bewerteMitarbeiter);
// Bewertungen abrufen
router.get("/admin", authMiddleware_1.verifyToken, bewertungController_1.getBewertungenFuerAdmin);
router.get("/kunde", authMiddleware_1.verifyToken, bewertungController_1.getBewertungenFuerKunde);
// Mitarbeiter wieder freigeben
router.post("/freigeben", authMiddleware_1.verifyToken, bewertungController_1.mitarbeiterWiederFreigeben);
exports.default = router;
// src/Routes/bewertungRoutes.ts
const express_2 = __importDefault(require("express"));
const bewertungController_2 = require("../Controllers/bewertungController");
const router = express_2.default.Router();
router.post("/", bewertungController_2.setBewertung); // POST /api/bewertung
router.get("/", bewertungController_2.getBewertungen); // GET  /api/bewertung
exports.default = router;
const bewertungController_3 = require("../Controllers/bewertungController");
const router = express_2.default.Router();
router.post("/", bewertungController_3.erstelleBewertung);
router.get("/", bewertungController_3.holeBewertungen);
exports.default = router;
