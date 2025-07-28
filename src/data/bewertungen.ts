export interface Bewertung {
  auftragId: number;
  mitarbeiterId: number;
  kundeId: number;
  bewertung: "grün" | "gelb" | "rot";
  kommentar: string | null;
  datum: Date;
}

export const bewertungen: Bewertung[] = [];
// src/data/bewertungen.ts

export type AmpelStatus = "grün" | "gelb" | "rot";

export interface Bewertung {
  mitarbeiterId: number;
  status: AmpelStatus;
  grund?: string;
}

export const bewertungen: Bewertung[] = [];
export interface Bewertung {
  id: number;
  mitarbeiterId: number;
  auftragId: number;
  status: "grün" | "gelb" | "rot";
  bemerkung?: string;
  erstelltAm: Date;
}

export const bewertungen: Bewertung[] = [];