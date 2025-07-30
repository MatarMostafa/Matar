// src/data/krankmeldungen.ts

export interface Krankmeldung {
  id: number;
  mitarbeiterId: number;
  von: string;  // ISO-Datum
  bis: string;  // ISO-Datum
  grund: string;
  status: "gemeldet" | "genehmigt" | "abgelehnt";
  erstelltAm: string; // ISO-Datum
}

export const krankmeldungen: Krankmeldung[] = [
  {
    id: 1,
    mitarbeiterId: 1,
    von: "2025-07-10",
    bis: "2025-07-15",
    grund: "Erkältung",
    status: "genehmigt",
    erstelltAm: "2025-07-09",
  },
  {
    id: 2,
    mitarbeiterId: 2,
    von: "2025-07-20",
    bis: "2025-07-22",
    grund: "Grippe",
    status: "gemeldet",
    erstelltAm: "2025-07-19",
  }
];