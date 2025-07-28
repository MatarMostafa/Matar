// src/data/sperren.ts

export interface Mitarbeitersperre {
  id: number;
  mitarbeiterId: number;
  grund: string;
  von: string; // Format: YYYY-MM-DD
  bis: string; // Format: YYYY-MM-DD
}

export const sperren: Mitarbeitersperre[] = [];