// src/data/urlaub.ts

export interface Urlaubsantrag {
  id: number;
  mitarbeiterId: number;
  von: string; // ISO-Format: "YYYY-MM-DD"
  bis: string;
  status: "beantragt" | "genehmigt" | "abgelehnt";
  kommentar?: string;
}

export const urlaubsantraege: Urlaubsantrag[] = [];