import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

let qualifikationen: any[] = [];

export const getAlleQualifikationen = (req: Request, res: Response) => {
  res.json(qualifikationen);
};

export const addQualifikation = (req: Request, res: Response) => {
  const neueQualifikation = { id: uuidv4(), ...req.body };
  qualifikationen.push(neueQualifikation);
  res.status(201).json(neueQualifikation);
};

export const deleteQualifikation = (req: Request, res: Response) => {
  const index = qualifikationen.findIndex(q => q.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Nicht gefunden" });
  qualifikationen.splice(index, 1);
  res.status(204).send();
};
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(__dirname, "..", "data", "qualifikationen.json");

const readData = () => {
  if (!fs.existsSync(DATA_PATH)) return [];
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(data);
};

const writeData = (data: any) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

export const getAlleQualifikationen = (req: Request, res: Response) => {
  res.json(readData());
};

export const addQualifikation = (req: Request, res: Response) => {
  const qualis = readData();
  const neueQuali = { id: Date.now().toString(), ...req.body };
  qualis.push(neueQuali);
  writeData(qualis);
  res.status(201).json(neueQuali);
};

export const deleteQualifikation = (req: Request, res: Response) => {
  let qualis = readData();
  qualis = qualis.filter((q: any) => q.id !== req.params.id);
  writeData(qualis);
  res.status(204).send();
};