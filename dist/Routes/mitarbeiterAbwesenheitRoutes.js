"use strict";
// src/Routes/mitarbeiterAbwesenheitRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MitarbeiterAbwesenheitController_1 = require("../Controllers/MitarbeiterAbwesenheitController");
const authMiddleware_1 = require("../Utils/authMiddleware");
const roleMiddleware_1 = require("../Utils/roleMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["mitarbeiter"]));
router.post("/urlaub", MitarbeiterAbwesenheitController_1.urlaubBeantragen);
router.post("/krank", MitarbeiterAbwesenheitController_1.krankmelden);
exports.default = router;
