"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qualifikationService_1 = require("../services/qualifikationService");
const router = express_1.default.Router();
// Alle Qualifikationen abrufen
router.get("/", qualifikationService_1.getAlleQualifikationen);
// Neue Qualifikation hinzufügen
router.post("/", qualifikationService_1.addQualifikation);
// Qualifikation löschen
router.delete("/:id", qualifikationService_1.deleteQualifikation);
exports.default = router;
const router = express_1.default.Router();
router.get("/", qualifikationService_1.getAlleQualifikationen);
router.post("/", qualifikationService_1.addQualifikation);
router.delete("/:id", qualifikationService_1.deleteQualifikation);
exports.default = router;
const router = express_1.default.Router();
router.get("/", qualifikationService_1.getAlleQualifikationen);
exports.default = router;
