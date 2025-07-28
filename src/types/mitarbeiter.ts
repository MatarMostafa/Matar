export interface Mitarbeiter {
  id: string;
  name: string;
  email: string;
  rolle: 'admin' | 'teamleiter' | 'mitarbeiter';
  status: 'aktiv' | 'inaktiv' | 'krank';
}