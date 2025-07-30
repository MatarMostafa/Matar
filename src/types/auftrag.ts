export interface Auftrag {
  id: number; // war string → jetzt number
  kunde: string;
  ort: string;
  datum: string;
  dauer: string;
  anzahlMitarbeiter: number;
  qualifikationen: number;
  status: string;
  erstelltVon: string;
}