"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const autoZuweisung_1 = require("../Utils/autoZuweisung");
const router = express_1.default.Router();
// POST /api/autoZuweisung
router.post("/", async (req, res) => {
    try {
        const result = await (0, autoZuweisung_1.automatischeZuweisung)(req.body);
        res.status(200).json({ message: "Automatische Zuweisung erfolgreich", result });
    }
    catch (error) {
        res.status(500).json({ message: "Fehler bei der automatischen Zuweisung", error: error.message });
    }
});
exports.default = router;
