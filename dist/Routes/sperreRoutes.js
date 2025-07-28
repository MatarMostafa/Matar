"use strict";
// src/Routes/sperreRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sperreController_1 = require("../Controllers/sperreController");
const router = express_1.default.Router();
// Alle Sperrstatus abrufen
router.get("/", sperreController_1.getSperrstatus);
// Mitarbeiter sperren
router.post("/sperren", sperreController_1.sperren);
// Mitarbeiter entsperren
router.post("/entsperren", sperreController_1.entsperren);
exports.default = router;
