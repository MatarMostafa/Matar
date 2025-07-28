// src/Services/zuweisungsService.ts

import { mitarbeiter } from "../data/mitarbeiter";
import { mitarbeiterQualifikationen } from "../data/mitarbeiterQualifikationen";
import { auftraege } from "../data/auftraege";

export const findePassendeMitarbeiter = (auftragId: number): number[] => {
  const auftrag = auftraege.find((a) => a.id === auftragId);
  if (!auftrag) return [];

  const passendeMitarbeiter = mitarbeiter.filter((m) => {
    // ❌ Sperre oder Abwesenheit prüfen
    if (m.gesperrt || m.abwesend) return false;

    // ❌ Zeitkonflikt prüfen
    const hatKonflikt = auftraege.some((a) =>
      a.mitarbeiterId === m.id &&
      a.datum === auftrag.datum &&
      a.zeitfenster === auftrag.zeitfenster
    );
    if (hatKonflikt) return false;

    // ✅ Qualifikation prüfen
    const qualifiziert = mitarbeiterQualifikationen.some(
      (q) =>
        q.mitarbeiterId === m.id &&
        q.qualifikationId === auftrag.benoetigteQualifikationId
    );
    return qualifiziert;
  });

  return passendeMitarbeiter.map((m) => m.id);
};