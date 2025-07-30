// src/Routes/fileRoutes.ts
import express from "express";
import multer from "multer";
import path from "path";
import { uploadFile, downloadFile } from "../Controllers/fileController";

const router = express.Router();

const upload = multer({
  dest: path.join(__dirname, "../../uploads"),
});

// POST /api/files/upload
router.post("/upload", upload.single("file"), uploadFile);

// GET /api/files/:filename
router.get("/:filename", downloadFile);

export default router;