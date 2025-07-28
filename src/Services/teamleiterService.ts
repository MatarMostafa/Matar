import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(__dirname, "..", "data", "teamleiter.json");

const readData = () => {
  if (!fs.existsSync(DATA_PATH)) return [];
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(data);
};

const writeData = (data: any) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

export const getTeamleiter = (req: Request, res: Response) => {
  res.json(readData());
};

export const updateTeamleiter = (req: Request, res: Response) => {
  let teamleiter = readData();
  const index = teamleiter.findIndex((t: any) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Nicht gefunden" });
  teamleiter[index] = { ...teamleiter[index], ...req.body };
  writeData(teamleiter);
  res.json(teamleiter[index]);
};

export const deleteTeamleiter = (req: Request, res: Response) => {
  let teamleiter = readData();
  teamleiter = teamleiter.filter((t: any) => t.id !== req.params.id);
  writeData(teamleiter);
  res.status(204).send();
};
// src/Services/teamleiterService.ts

export interface Teamleiter {
  id: number;
  name: string;
  email: string;
  kundenIds: number[]; // Kunden, für die dieser Teamleiter zuständig ist
}

let teamleiterListe: Teamleiter[] = [];
let teamleiterId = 1;

// Neuen Teamleiter anlegen
export const erstelleTeamleiter = (name: string, email: string): Teamleiter => {
  const neuerTeamleiter: Teamleiter = {
    id: teamleiterId++,
    name,
    email,
    kundenIds: [],
  };
  teamleiterListe.push(neuerTeamleiter);
  return neuerTeamleiter;
};

// Teamleiter zu Kunde zuweisen
export const weiseTeamleiterZuKunde = (teamleiterId: number, kundenId: number): boolean => {
  const teamleiter = teamleiterListe.find((tl) => tl.id === teamleiterId);
  if (!teamleiter) return false;
  if (!teamleiter.kundenIds.includes(kundenId)) {
    teamleiter.kundenIds.push(kundenId);
  }
  return true;
};

// Alle Teamleiter abrufen
export const getAlleTeamleiter = (): Teamleiter[] => {
  return teamleiterListe;
};