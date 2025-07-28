"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/Routes/mitarbeiterStatusRoutes.ts
const express_1 = __importDefault(require("express"));
const MitarbeiterStatusController_1 = require("../Controllers/MitarbeiterStatusController");
const authMiddleware_1 = require("../Utils/authMiddleware");
const roleMiddleware_1 = require("../Utils/roleMiddleware");
const router = express_1.default.Router();
router.post("/urlaub", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["mitarbeiter"]), MitarbeiterStatusController_1.beantrageUrlaub);
router.post("/krankmelden", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)(["mitarbeiter"]), MitarbeiterStatusController_1.krankmelden);
exports.default = router;
const mitarbeiterStatusController_1 = require("../Controllers/mitarbeiterStatusController");
const router = express_1.default.Router();
// Routen für Krankmeldung & Urlaub
router.post("/krankmelden", MitarbeiterStatusController_1.krankmelden);
router.post("/urlaub", mitarbeiterStatusController_1.urlaubBeantragen);
exports.default = router;
