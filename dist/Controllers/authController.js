"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const authService_1 = require("../Services/authService");
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = (0, authService_1.findUserByUsername)(username);
    if (!user) {
        return res.status(401).json({ message: 'Benutzer nicht gefunden' });
    }
    const isValid = await (0, authService_1.verifyPassword)(password, user.password);
    if (!isValid) {
        return res.status(401).json({ message: 'Ungültiges Passwort' });
    }
    const token = (0, authService_1.generateToken)(user);
    res.status(200).json({ token, user: { id: user.id, username: user.username, role: user.role } });
};
exports.login = login;
