// src/Controllers/fileController.ts
import { Request, Response } from "express";
import path from "path";
import fs from "fs";

const uploadDir = path.join(__dirname, "../../uploads");

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "Keine Datei hochgeladen" });
  }
  res.status(200).json({ message: "Datei erfolgreich hochgeladen", filename: req.file.filename });
};

export const downloadFile = (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filepath = path.join(uploadDir, filename);

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ message: "Datei nicht gefunden" });
  }

  res.download(filepath);
};