"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsername = findUserByUsername;
exports.verifyPassword = verifyPassword;
exports.generateToken = generateToken;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users = [
    {
        id: '1',
        username: 'admin',
        password: bcrypt_1.default.hashSync('pass123', 10),
        role: 'admin'
    },
    {
        id: '2',
        username: 'teamleiter',
        password: bcrypt_1.default.hashSync('pass456', 10),
        role: 'teamleiter'
    }
];
function findUserByUsername(username) {
    return users.find(user => user.username === username);
}
async function verifyPassword(password, hash) {
    return bcrypt_1.default.compare(password, hash);
}
function generateToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
}
