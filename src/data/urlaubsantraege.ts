// src/data/urlaubsantraege.ts

export interface Urlaubsantrag {
  id: number;
  mitarbeiterId: number;
  von: string; // ISO-Datum
  bis: string; // ISO-Datum
  grund: string;
  status: "offen" | "genehmigt" | "abgelehnt";
}

export const urlaubsantraege: Urlaubsantrag[] = [];