// src/Utils/ersatzPlanung.ts

import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";
import { sendeBenachrichtigung } from "./benachrichtigung";

// Dummy-Funktion für automatische Ersatzplanung
export function sucheUndSetzeErsatz(krankMitarbeiterId: number, datum: string) {
  console.log(`🔁 Suche Ersatz für Mitarbeiter ${krankMitarbeiterId} am ${datum}...`);

  // Finde betroffene Aufträge
  const betroffeneAuftraege = auftraege.filter(a =>
    a.datum === datum &&
    a.mitarbeiter.includes(krankMitarbeiterId)
  );

  for (const auftrag of betroffeneAuftraege) {
    const index = auftrag.mitarbeiter.indexOf(krankMitarbeiterId);
    if (index !== -1) {
      // Suche Ersatzmitarbeiter
      const ersatz = mitarbeiter.find(m => m.verfuegbar && m.id !== krankMitarbeiterId);
      if (ersatz) {
        auftrag.mitarbeiter[index] = ersatz.id;
        sendeBenachrichtigung("mitarbeiter", `Du bist als Ersatz eingeteilt für ${datum}.`);
        console.log(`✅ Ersatz ${ersatz.id} wurde zugewiesen für Auftrag ${auftrag.id}`);
      } else {
        console.log(`⚠️ Kein Ersatz gefunden für Auftrag ${auftrag.id}`);
      }
    }
  }
}