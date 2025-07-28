"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ausfallController_1 = require("../Controllers/ausfallController");
const router = express_1.default.Router();
router.post('/sperren', (req, res) => (0, ausfallController_1.sperreMitarbeiter)(req, res));
router.post('/freigeben', (req, res) => (0, ausfallController_1.freigebenMitarbeiter)(req, res));
exports.default = router;
