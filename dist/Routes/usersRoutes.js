"use strict";
// src/routes/usersRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Beispiel-Datenbank (ersetzt später durch echte DB)
const users = [
    { id: 1, name: "Max Mustermann", role: "Mitarbeiter" },
    { id: 2, name: "Erika Musterfrau", role: "Teamleiter" },
];
// Alle Benutzer abrufen
router.get("/", (req, res) => {
    res.json(users);
});
// Benutzer nach ID abrufen
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user)
        return res.status(404).json({ message: "Benutzer nicht gefunden" });
    res.json(user);
});
exports.default = router;
