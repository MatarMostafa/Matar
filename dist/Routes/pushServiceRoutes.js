"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pushServiceController_1 = require("../Controllers/pushServiceController");
const router = express_1.default.Router();
router.post('/senden', pushServiceController_1.sendePush);
exports.default = router;
