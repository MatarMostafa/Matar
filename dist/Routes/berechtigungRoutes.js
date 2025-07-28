"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const benachrichtigungController_1 = require("../Controllers/benachrichtigungController");
const router = express_1.default.Router();
// Neue Benachrichtigung erstellen
router.post("/", (req, res) => {
    (0, benachrichtigungController_1.sendeBenachrichtigung)(req, res);
});
// Alle Benachrichtigungen für einen Nutzer abrufen
router.get("/nutzer/:nutzerId", (req, res) => {
    (0, benachrichtigungController_1.getBenachrichtigungenFuerNutzer)(req, res);
});
// Eine Benachrichtigung als gelesen markieren
router.put("/:id/gelesen", (req, res) => {
    (0, benachrichtigungController_1.markiereAlsGelesen)(req, res);
});
// Eine Benachrichtigung löschen
router.delete("/:id", (req, res) => {
    (0, benachrichtigungController_1.deleteBenachrichtigung)(req, res);
});
exports.default = router;
