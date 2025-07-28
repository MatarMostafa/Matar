// src/Utils/autoZuweisung.ts

import { mitarbeiter } from "../data/mitarbeiter";

export function findePassendeMitarbeiter(benötigteQualifikationen: number[]) {
  return mitarbeiter.filter((m) =>
    benötigteQualifikationen.every((qId) => m.qualifikationen.includes(qId)) &&
    m.verfügbar
  );
}
import { gesperrteMitarbeiter } from "../data/ausfaelle";

export function findePassendeMitarbeiter(benötigteQualifikationen: number[]) {
  return mitarbeiter.filter(
    (m) =>
      m.verfügbar &&
      !gesperrteMitarbeiter.includes(m.id) &&
      benötigteQualifikationen.every((qId) => m.qualifikationen.includes(qId))
  );
}