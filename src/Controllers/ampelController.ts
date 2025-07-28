// src/Controllers/ampelController.ts

import { Request, Response } from "express";
import { mitarbeiter } from "../data/mitarbeiter";
import { urlaub } from "../data/urlaub";
import { krankmeldungen } from "../data/krank";

export const getAmpelStatus = (req: Request, res: Response) => {
  const heute = new Date();

  const bewertungen = mitarbeiter.map((m) => {
    const urlaube = urlaub.filter((u) => u.mitarbeiterId === m.id);
    const krankheiten = krankmeldungen.filter((k) => k.mitarbeiterId === m.id);

    const istAktuellAbwesend = [...urlaube, ...krankheiten].some((eintrag) => {
      const von = new Date(eintrag.von);
      const bis = new Date(eintrag.bis);
      return heute >= von && heute <= bis;
    });

    const status = istAktuellAbwesend ? "rot" : "grün";

    return {
      mitarbeiterId: m.id,
      name: m.name,
      status,
    };
  });

  res.json(bewertungen);
};