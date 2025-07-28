// src/data/statusListen.ts

interface Krankmeldung {
  mitarbeiterId: number;
  grund: string;
  datum: string;
  uhrzeit: string;
  status: "krank";
}

interface Urlaubsantrag {
  mitarbeiterId: number;
  von: string;
  bis: string;
  kommentar: string;
  status: "beantragt" | "genehmigt" | "abgelehnt";
}

export const krankmeldungen: Krankmeldung[] = [];
export const urlaubsantraege: Urlaubsantrag[] = [];