"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/Routes/fileRoutes.ts
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fileController_1 = require("../Controllers/fileController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    dest: path_1.default.join(__dirname, "../../uploads"),
});
// POST /api/files/upload
router.post("/upload", upload.single("file"), fileController_1.uploadFile);
// GET /api/files/:filename
router.get("/:filename", fileController_1.downloadFile);
exports.default = router;
