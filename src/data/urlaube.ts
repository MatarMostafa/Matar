// src/data/urlaube.ts

export interface Urlaub {
  mitarbeiterId: number;
  von: string;
  bis: string;
  kommentar?: string;
  erstelltAm: string;
}

export const urlaube: Urlaub[] = [];
// src/data/urlaube.ts

export interface Urlaub {
  mitarbeiterId: number;
  von: string; // z. B. "2025-07-10"
  bis: string;
}

export const urlaube: Urlaub[] = [];
// src/data/urlaube.ts

export interface Urlaub {
  id: number;
  mitarbeiterId: number;
  von: string; // z.B. "2025-08-01"
  bis: string;
  grund?: string;
  status: "beantragt" | "genehmigt" | "abgelehnt";
}

export const urlaube: Urlaub[] = [
  // Beispielurlaubseintrag (optional)
  {
    id: 1,
    mitarbeiterId: 2,
    von: "2025-08-10",
    bis: "2025-08-15",
    grund: "Familienurlaub",
    status: "genehmigt",
  },
];