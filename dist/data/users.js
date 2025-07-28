"use strict";
// src/data/users.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Beispiel-Userdatenbank mit gehashten Passwörtern
const plainPassword = "test123"; // Nur zum Hashen!
const hashedPassword = bcryptjs_1.default.hashSync(plainPassword, 10);
exports.users = [
    {
        id: "1",
        username: "admin",
        password: hashedPassword,
        role: "admin",
    },
    {
        id: "2",
        username: "teamleiter1",
        password: hashedPassword,
        role: "teamleiter",
    },
    {
        id: "3",
        username: "mitarbeiter1",
        password: hashedPassword,
        role: "mitarbeiter",
    },
];
