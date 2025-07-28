// src/Utils/csvExporter.ts

import { auftraege } from "../data/auftraege";
import { parse } from "json2csv";
import fs from "fs";
import path from "path";

export const exportiereAuftraegeAlsCSV = (): string => {
  const fields = ["id", "datum", "kundeId", "mitarbeiterId", "beschreibung", "status"];
  const opts = { fields };

  try {
    const csv = parse(auftraege, opts);

    const exportPfad = path.join(__dirname, "../../exports/auftraege_export.csv");
    fs.writeFileSync(exportPfad, csv, "utf8");

    console.log("✅ Aufträge als CSV exportiert:", exportPfad);
    return exportPfad;
  } catch (err) {
    console.error("❌ Fehler beim Exportieren:", err);
    return "";
  }
};