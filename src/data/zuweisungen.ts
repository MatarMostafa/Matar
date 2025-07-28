// src/data/zuweisungen.ts

export interface Zuweisung {
  datum: string;
  mitarbeiterId: number;
  rolle: string;
}

export const zuweisungen: Zuweisung[] = [];