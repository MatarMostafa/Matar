export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'teamleiter' | 'mitarbeiter';
}