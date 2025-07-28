// src/Services/exportService.ts

import { auftraege } from "../data/auftraege";
import { Parser } from "json2csv";
import fs from "fs";
import path from "path";

export const exportiereAuftraegeAlsCSV = (): string => {
  const fields = ["id", "kundeId", "datum", "mitarbeiterId", "status"];
  const parser = new Parser({ fields });
  const csv = parser.parse(auftraege);

  const dateipfad = path.join(__dirname, "../../exports/auftraege_export.csv");
  fs.writeFileSync(dateipfad, csv);

  return dateipfad;
};