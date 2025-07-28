"use strict";
// src/Routes/krankmeldungRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const krankmeldungController_1 = require("../Controllers/krankmeldungController");
const router = express_1.default.Router();
router.post("/melden", krankmeldungController_1.meldeKrankheit);
router.get("/", krankmeldungController_1.getKrankmeldungen);
exports.default = router;
