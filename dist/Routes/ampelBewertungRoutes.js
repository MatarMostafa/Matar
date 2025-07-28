"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ampelBewertungController_1 = require("../Controllers/ampelBewertungController");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const roleMiddleware_1 = require("../Middleware/roleMiddleware");
const router = express_1.default.Router();
// Route: POST /bewerteAmpel
router.post('/bewerteAmpel', (req, res, next) => (0, authMiddleware_1.authenticate)(req, res, next), (0, roleMiddleware_1.authorizeRole)(['admin', 'teamleiter']), ampelBewertungController_1.bewerteteMitarbeiterAmpelHandler);
exports.default = router;
