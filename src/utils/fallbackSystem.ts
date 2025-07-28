// src/Utils/fallbackSystem.ts

import { auftraege } from "../data/auftraege";
import { bewertungen } from "../data/bewertungen";
import { mitarbeiter } from "../data/mitarbeiter";
import { zuweisungen } from "../data/zuweisungen";

export function fallbackPruefenUndZuweisen() {
  const ausfaelle = bewertungen.filter(b => b.status === "rot");

  ausfaelle.forEach(ausfall => {
    const betroffeneAuftraege = auftraege.filter(a => a.mitarbeiterId === ausfall.mitarbeiterId);

    betroffeneAuftraege.forEach(auftrag => {
      const passendeErsatzkandidaten = mitarbeiter.filter(m => {
        // Nicht der ausgefallene
        if (m.id === ausfall.mitarbeiterId) return false;

        // Noch nicht zugewiesen
        const bereitsZugewiesen = auftraege.some(a => a.mitarbeiterId === m.id && a.datum === auftrag.datum);
        if (bereitsZugewiesen) return false;

        // Hat die Qualifikation?
        const maQualis = zuweisungen.filter(z => z.mitarbeiterId === m.id).map(z => z.qualifikation);
        return maQualis.includes(auftrag.benoetigteQualifikation);
      });

      if (passendeErsatzkandidaten.length > 0) {
        const ersatz = passendeErsatzkandidaten[0];
        console.log(`⚠️ Ersatz für Auftrag ${auftrag.id}: ${ersatz.vorname} ${ersatz.nachname}`);

        // Mitarbeiter im Auftrag ersetzen
        auftrag.mitarbeiterId = ersatz.id;
      }
    });
  });
}
// src/Utils/fallbackSystem.ts

import { mitarbeiter } from "../data/mitarbeiter";
import { krankmeldungen } from "../data/krankmeldungen";
import { urlaube } from "../data/urlaube";
import { zuweisungen } from "../data/zuweisungen";

export const fallbackPruefenUndZuweisen = (datum: string) => {
  const betroffeneMitarbeiter: number[] = [];

  // Alle krankgemeldeten IDs für das Datum sammeln
  krankmeldungen.forEach(k => {
    if (k.datum === datum) betroffeneMitarbeiter.push(k.mitarbeiterId);
  });

  // Alle urlaubsbedingten Ausfälle sammeln
  urlaube.forEach(u => {
    if (datum >= u.von && datum <= u.bis) {
      betroffeneMitarbeiter.push(u.mitarbeiterId);
    }
  });

  // Fallback-Zuweisung prüfen
  betroffeneMitarbeiter.forEach(ausgefallenId => {
    const ursprünglicheZuweisung = zuweisungen.find(z => z.mitarbeiterId === ausgefallenId && z.datum === datum);

    if (ursprünglicheZuweisung) {
      const ersatz = mitarbeiter.find(m => 
        !betroffeneMitarbeiter.includes(m.id) &&
        m.rolle === ursprünglicheZuweisung.rolle &&
        m.verfuegbar === true
      );

      if (ersatz) {
        zuweisungen.push({
          datum,
          mitarbeiterId: ersatz.id,
          rolle: ursprünglicheZuweisung.rolle,
        });

        console.log(`🔄 Ersatz zugewiesen: ${ersatz.id} für ausgefallenen MA ${ausgefallenId} am ${datum}`);
      } else {
        console.log(`⚠️ Kein Ersatz verfügbar für ${ausgefallenId} am ${datum}`);
      }
    }
  });
};
// src/Utils/fallbackSystem.ts

import { auftraege } from "../data/auftraege";
import { users } from "../data/users";
import { abwesenheiten } from "../data/abwesenheiten"; // dort stehen Krank/Urlaub
import { Auftrag } from "../data/auftraege";

// Helferfunktion: Ist Mitarbeiter abwesend am Datum?
function istAbwesend(mitarbeiterId: number, datum: string): boolean {
  return abwesenheiten.some(
    (a) => a.mitarbeiterId === mitarbeiterId && a.datum === datum
  );
}

// Fallback ausführen für einen bestimmten Tag
export function fallbackZuweisung(datum: string) {
  let ersetzte = 0;

  auftraege.forEach((auftrag) => {
    if (auftrag.datum !== datum || !auftrag.mitarbeiterIds) return;

    const neueZuweisung: number[] = [];

    auftrag.mitarbeiterIds.forEach((mid) => {
      if (!istAbwesend(mid, datum)) {
        neueZuweisung.push(mid); // bleibt drin
      } else {
        const ersatz = users.find(
          (u) =>
            u.role === "mitarbeiter" &&
            !istAbwesend(u.id, datum) &&
            !auftrag.mitarbeiterIds?.includes(u.id)
        );

        if (ersatz) {
          neueZuweisung.push(ersatz.id);
          ersetzte++;
        }
      }
    });

    auftrag.mitarbeiterIds = neueZuweisung;
  });

  return ersetzte;
}
// src/Utils/fallbackSystem.ts
import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";
import { mitarbeiterAbwesenheiten } from "../data/abwesenheiten";
import { benachrichtigungen } from "../data/benachrichtigungen";

export function ersetzeAusgefalleneMitarbeiter() {
  const heute = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  auftraege.forEach((auftrag) => {
    if (auftrag.datum !== heute) return;

    const mitarbeiterId = auftrag.mitarbeiterId;

    const istAbwesend = mitarbeiterAbwesenheiten.some(
      (a) => a.mitarbeiterId === mitarbeiterId && a.datum === heute
    );

    if (!istAbwesend) return;

    const ersatz = mitarbeiter.find(
      (m) =>
        m.id !== mitarbeiterId &&
        !mitarbeiterAbwesenheiten.some(
          (a) => a.mitarbeiterId === m.id && a.datum === heute
        ) &&
        m.qualifikationen.includes(auftrag.benoetigteQualifikation)
    );

    if (ersatz) {
      const vorher = auftrag.mitarbeiterId;
      auftrag.mitarbeiterId = ersatz.id;

      benachrichtigungen.push({
        id: benachrichtigungen.length + 1,
        empfängerId: ersatz.id,
        inhalt: `⚠️ Fallback: Du wurdest für den Auftrag am ${auftrag.datum} eingeteilt (Ersatz für MA ${vorher})`,
        gelesen: false,
        zeitpunkt: new Date(),
      });
    }
  });
}