"use strict";
// src/Routes/ampelRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ampelController_1 = require("../Controllers/ampelController");
const router = express_1.default.Router();
// GET /api/ampel
router.get("/", ampelController_1.getAmpelStatus);
exports.default = router;
