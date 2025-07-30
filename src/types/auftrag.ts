export interface Auftrag {
  id: number;
  kundeId: number;
  mitarbeiterId: number;  // <-- hinzugefügt
  kunde: string;
  beschreibung: string;
  status: string;
  datum: string;
}
