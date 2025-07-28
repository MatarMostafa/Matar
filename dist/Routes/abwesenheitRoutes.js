"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const abwesenheitService_1 = require("../Services/abwesenheitService");
const router = express_1.default.Router();
router.post("/abwesenheit", (req, res) => {
    const eintrag = req.body;
    (0, abwesenheitService_1.meldenAbwesenheit)(eintrag);
    res.status(200).json({ message: "Abwesenheit erfasst und Benachrichtigung gesendet." });
});
exports.default = router;
