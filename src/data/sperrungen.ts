// src/data/sperrungen.ts

export interface Mitarbeitersperre {
  mitarbeiterId: number;
  grund: string;
  von: string; // ISO-Datum
  bis: string | null; // null = dauerhaft gesperrt
}

export const sperrungen: Mitarbeitersperre[] = [];