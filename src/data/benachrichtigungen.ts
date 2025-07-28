// src/data/benachrichtigungen.ts

export interface Benachrichtigung {
  id: number;
  empfaengerId: number;
  betreff: string;
  nachricht: string;
  gelesen: boolean;
  zeitpunkt: Date;
}

export const benachrichtigungen: Benachrichtigung[] = [];