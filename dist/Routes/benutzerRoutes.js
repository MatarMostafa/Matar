"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authcontroller_1 = require("../Controllers/Authcontroller");
const router = express_1.default.Router();
// Route: /api/benutzer/login
router.post("/login", Authcontroller_1.login);
// Route: /api/benutzer/register
router.post("/register", Authcontroller_1.register);
exports.default = router;
// Alle „roten“ Bewertungen anzeigen
router.get("/sperrungen", authMiddleware, roleMiddleware(["admin"]), getSperrungen);
// Mitarbeiter wieder freigeben (Admin)
router.post("/entsperren", authMiddleware, roleMiddleware(["admin"]), entsperreMitarbeiter);
