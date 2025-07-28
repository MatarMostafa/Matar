"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailServiceController_1 = require("../Controllers/emailServiceController");
const router = express_1.default.Router();
router.post("/senden", emailServiceController_1.sendeEmail);
exports.default = router;
