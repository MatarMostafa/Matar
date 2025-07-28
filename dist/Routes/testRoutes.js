"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../Middleware/verifyToken");
const router = express_1.default.Router();
// Einfache Diagnose-Route, nur für eingeloggte Nutzer
router.get("/token", verifyToken_1.verifyToken, (req, res) => {
    res.json({
        message: "Token ist gültig",
        userId: req.user.id,
        role: req.user.role,
    });
});
exports.default = router;
