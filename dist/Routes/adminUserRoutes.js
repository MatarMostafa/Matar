"use strict";
// src/Routes/adminUserRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../data/users");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
// 📄 Alle Benutzer abrufen
router.get("/", (_req, res) => {
    const alle = users_1.users.map(({ password, ...rest }) => rest);
    res.json(alle);
});
// ➕ Neuen Benutzer anlegen
router.post("/", (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ message: "Alle Felder erforderlich" });
    }
    if (users_1.users.find((u) => u.email === email)) {
        return res.status(409).json({ message: "Benutzer existiert bereits" });
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    const newUser = {
        id: users_1.users.length + 1,
        email,
        password: hashedPassword,
        role,
    };
    users_1.users.push(newUser);
    res.status(201).json({ message: "Benutzer hinzugefügt", user: { id: newUser.id, email, role } });
});
// ✏️ Rolle ändern
router.put("/:id/rolle", (req, res) => {
    const id = parseInt(req.params.id);
    const { neueRolle } = req.body;
    const user = users_1.users.find((u) => u.id === id);
    if (!user)
        return res.status(404).json({ message: "Benutzer nicht gefunden" });
    user.role = neueRolle;
    res.json({ message: "Rolle geändert", user: { id: user.id, email: user.email, role: user.role } });
});
// 🔑 Passwort ändern
router.put("/:id/passwort", (req, res) => {
    const id = parseInt(req.params.id);
    const { neuesPasswort } = req.body;
    const user = users_1.users.find((u) => u.id === id);
    if (!user)
        return res.status(404).json({ message: "Benutzer nicht gefunden" });
    user.password = bcryptjs_1.default.hashSync(neuesPasswort, 10);
    res.json({ message: "Passwort geändert" });
});
// ❌ Benutzer löschen
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users_1.users.findIndex((u) => u.id === id);
    if (index === -1)
        return res.status(404).json({ message: "Benutzer nicht gefunden" });
    users_1.users.splice(index, 1);
    res.json({ message: "Benutzer gelöscht" });
});
exports.default = router;
