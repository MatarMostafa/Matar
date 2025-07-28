export interface Bewertung {
  id: string;
  mitarbeiterId: string;
  kategorie: string;
  bewertung: number;
  kommentar?: string;
  datum: string;
}