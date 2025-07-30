// src/Controllers/sperreController.ts

import { Request, Response } from "express";
import { gesperrteMitarbeiter } from "../data/gesperrteMitarbeiter";
import { mitarbeiter } from "../data/mitarbeiter";

export const getSperrstatus = (req: Request, res: Response) => {
  const statusListe = mitarbeiter.map((m) => ({
    mitarbeiterId: m.id,
    name: m.name,
    gesperrt: gesperrteMitarbeiter.includes(m.id),
  }));

  res.json(statusListe);
};

export const sperren = (req: Request, res: Response) => {
  const { mitarbeiterId } = req.body;
  if (!gesperrteMitarbeiter.includes(mitarbeiterId)) {
    gesperrteMitarbeiter.push(mitarbeiterId);
  }
  res.json({ message: "Mitarbeiter gesperrt", mitarbeiterId });
};

export const entsperren = (req: Request, res: Response) => {
  const { mitarbeiterId } = req.body;
  const index = gesperrteMitarbeiter.indexOf(mitarbeiterId);
  if (index > -1) {
    gesperrteMitarbeiter.splice(index, 1);
  }
  res.json({ message: "Mitarbeiter entsperrt", mitarbeiterId });
};