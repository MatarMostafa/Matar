// src/Utils/fallbackZuweisung.ts

import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";
import { sendeBenachrichtigung } from "./benachrichtigung";

export const ersatzMitarbeiterZuweisen = (datum: string, mitarbeiterId: number) => {
  console.log(`⚠ Fallback-Auslösung für ${datum}, ausgefallener MA: ${mitarbeiterId}`);

  const auftrag = auftraege.find(
    (a) => a.datum === datum && a.mitarbeiterId === mitarbeiterId
  );

  if (!auftrag) {
    console.log(`❌ Kein passender Auftrag gefunden.`);
    return;
  }

  const ersatz = mitarbeiter.find(
    (m) =>
      m.id !== mitarbeiterId &&
      !(m.sperrungen || []).includes(datum)
  );

  if (ersatz) {
    auftrag.mitarbeiterId = ersatz.id;

    sendeBenachrichtigung(
      ersatz.email,
      `Sie wurden als Ersatz für den Auftrag am ${datum} eingeteilt.`
    );

    console.log(`✅ Ersatzmitarbeiter ${ersatz.name} zugewiesen.`);
  } else {
    console.log("⚠ Kein Ersatzmitarbeiter verfügbar.");
  }
};