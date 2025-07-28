// src/Services/autoPlanung.ts

import { einsaetze } from "../data/einsaetze";
import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";
import { sperren } from "../data/mitarbeitersperren"; // Wichtig: neue Datei

// Hilfsfunktion: Prüfe ob Mitarbeiter gesperrt ist
const istGesperrt = (mitarbeiterId: number, datum: string): boolean => {
  return sperren.some((s) => {
    return (
      s.mitarbeiterId === mitarbeiterId &&
      new Date(datum) >= new Date(s.startDatum) &&
      new Date(datum) <= new Date(s.endDatum)
    );
  });
};

// Automatische Einsatzplanung
export const automatischePlanung = () => {
  const heute = new Date();
  const heuteString = heute.toISOString().split("T")[0];

  const offeneAuftraege = auftraege.filter((a) => a.status === "offen");

  offeneAuftraege.forEach((auftrag) => {
    const freieMitarbeiter = mitarbeiter.filter((m) => {
      const istSchonEingeplant = einsaetze.some(
        (e) => e.mitarbeiterId === m.id && e.datum === auftrag.datum
      );
      return (
        m.qualifikationen.includes(auftrag.qualifikation) &&
        !istSchonEingeplant &&
        !istGesperrt(m.id, auftrag.datum) // Sperrprüfung
      );
    });

    if (freieMitarbeiter.length > 0) {
      const mitarbeiterGefunden = freieMitarbeiter[0];
      einsaetze.push({
        id: einsaetze.length + 1,
        auftragId: auftrag.id,
        mitarbeiterId: mitarbeiterGefunden.id,
        datum: auftrag.datum,
      });
      auftrag.status = "geplant";
    }
  });
};