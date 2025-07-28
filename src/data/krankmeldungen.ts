// src/data/krankmeldungen.ts

export interface Krankmeldung {
  id: number;
  mitarbeiterId: number;
  von: string; // z.B. "2025-07-01"
  bis: string;
  grund: string;
}

export const krankmeldungen: Krankmeldung[] = [];
// src/data/krankmeldungen.ts

export interface Krankmeldung {
  mitarbeiterId: number;
  datum: string;
}

export const krankmeldungen: Krankmeldung[] = [];
// src/data/krankmeldungen.ts

export interface Krankmeldung {
  mitarbeiterId: number;
  datum: string;
}

export const krankmeldungen: Krankmeldung[] = [];
// src/data/krankmeldungen.ts

export interface Krankmeldung {
  id: number;
  mitarbeiterId: number;
  startDatum: string;   // Format: YYYY-MM-DD
  endDatum: string;     // Format: YYYY-MM-DD
  kommentar?: string;
  status: "offen" | "genehmigt" | "abgelehnt";
}

export const krankmeldungen: Krankmeldung[] = [];