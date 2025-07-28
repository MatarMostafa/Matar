"use strict";
// src/Services/registerService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_1 = require("../data/users");
const registerUser = async (email, password, role) => {
    const existingUser = users_1.users.find((u) => u.email === email);
    if (existingUser) {
        throw new Error("Benutzer existiert bereits");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = {
        id: users_1.users.length + 1,
        email,
        password: hashedPassword,
        role,
    };
    users_1.users.push(newUser);
    return {
        message: "Benutzer erfolgreich registriert",
        user: {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
        },
    };
};
exports.registerUser = registerUser;
