export interface Mitarbeitersperre {
  id: number;
  mitarbeiterId: number;
  grund: string;
  von: string; // ISO-Datum
  bis: string; // ISO-Datum
}

export const mitarbeiterSperren: Mitarbeitersperre[] = [];
// src/data/mitarbeitersperren.ts

export interface Mitarbeitersperre {
  id: number;
  mitarbeiterId: number;
  grund: string;
  von: string; // YYYY-MM-DD
  bis: string; // YYYY-MM-DD
  aktiv: boolean;
}

export const mitarbeitersperren: Mitarbeitersperre[] = [];
// src/data/mitarbeitersperren.ts

export interface Mitarbeitersperre {
  id: number;
  mitarbeiterId: number;
  startDatum: string;
  endDatum: string;
  grund: string;
}

export const sperren: Mitarbeitersperre[] = [];