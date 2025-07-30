export interface Mitarbeiter {
  id: number;
  name: string;
  rolle: 'admin' | 'teamleiter' | 'mitarbeiter';
  aktiv: boolean;
}
