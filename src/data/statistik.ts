// src/data/statistik.ts

export interface EinsatzStatistik {
  datum: string;
  mitarbeiterId: number;
  einsatzdauer: number; // Stunden
  einsatzOrt: string;
}

export const statistikDaten: EinsatzStatistik[] = [
  { datum: "2025-07-01", mitarbeiterId: 1, einsatzdauer: 5, einsatzOrt: "Berlin" },
  { datum: "2025-07-01", mitarbeiterId: 2, einsatzdauer: 6, einsatzOrt: "Hamburg" },
  { datum: "2025-07-02", mitarbeiterId: 1, einsatzdauer: 8, einsatzOrt: "Berlin" },
];