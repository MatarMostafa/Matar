// src/data/mitarbeiterQualifikationen.ts

interface MitarbeiterQualifikation {
  mitarbeiterId: number;
  qualifikationId: number;
}

export const mitarbeiterQualifikationen: MitarbeiterQualifikation[] = [
  { mitarbeiterId: 1, qualifikationId: 1 }, // Mitarbeiter 1 hat Pflegekraft
  { mitarbeiterId: 2, qualifikationId: 2 },
  { mitarbeiterId: 3, qualifikationId: 1 },
  { mitarbeiterId: 3, qualifikationId: 3 }, // Mitarbeiter 3 hat 2 Qualifikationen
];
export interface MitarbeiterQualifikation {
  mitarbeiterId: number;
  qualifikationId: number;
}

export const mitarbeiterQualifikationen: MitarbeiterQualifikation[] = [
  { mitarbeiterId: 1, qualifikationId: 1 },
  { mitarbeiterId: 1, qualifikationId: 2 },
  { mitarbeiterId: 2, qualifikationId: 2 },
];