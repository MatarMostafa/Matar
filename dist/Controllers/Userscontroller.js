"use strict";
// src/Controllers/UserController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const users_1 = require("../data/users");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Dummy-Datenliste mutieren (normalerweise Datenbank)
let userList = [...users_1.users];
// GET /api/users
const getAllUsers = (_req, res) => {
    res.json(userList);
};
exports.getAllUsers = getAllUsers;
// GET /api/users/:id
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = userList.find(u => u.id === id);
    if (!user)
        return res.status(404).json({ message: "Benutzer nicht gefunden" });
    res.json(user);
};
exports.getUserById = getUserById;
// POST /api/users
const createUser = (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ message: "Alle Felder (email, password, role) sind erforderlich." });
    }
    const exists = userList.find(u => u.email === email);
    if (exists) {
        return res.status(409).json({ message: "Benutzer existiert bereits." });
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    const newUser = {
        id: userList.length + 1,
        email,
        password: hashedPassword,
        role,
    };
    userList.push(newUser);
    res.status(201).json(newUser);
};
exports.createUser = createUser;
// PUT /api/users/:id
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = userList.find(u => u.id === id);
    if (!user)
        return res.status(404).json({ message: "Benutzer nicht gefunden" });
    const { email, password, role } = req.body;
    if (email)
        user.email = email;
    if (role)
        user.role = role;
    if (password) {
        user.password = bcryptjs_1.default.hashSync(password, 10);
    }
    res.json({ message: "Benutzer aktualisiert", user });
};
exports.updateUser = updateUser;
// DELETE /api/users/:id
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const index = userList.findIndex(u => u.id === id);
    if (index === -1)
        return res.status(404).json({ message: "Benutzer nicht gefunden" });
    userList.splice(index, 1);
    res.json({ message: "Benutzer gelöscht" });
};
exports.deleteUser = deleteUser;
