"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminKundenStatistikController_1 = require("../Controllers/adminKundenStatistikController");
const router = express_1.default.Router();
router.get('/statistik', adminKundenStatistikController_1.getAdminStatistik);
exports.default = router;
