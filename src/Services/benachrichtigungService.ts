import { Benachrichtigung } from "../types/benachrichtigung";

// Beispiel-Datenhaltung (später durch DB ersetzen)
let benachrichtigungen: Benachrichtigung[] = [];

// Neue Benachrichtigung erstellen
export const createBenachrichtigung = (data: Benachrichtigung): Benachrichtigung => {
  const neueBenachrichtigung = { ...data, id: Date.now().toString() };
  benachrichtigungen.push(neueBenachrichtigung);
  return neueBenachrichtigung;
};

// Alle Benachrichtigungen abrufen
export const getBenachrichtigungen = (): Benachrichtigung[] => {
  return benachrichtigungen;
};

// Benachrichtigung löschen
export const deleteBenachrichtigung = (id: string): void => {
  benachrichtigungen = benachrichtigungen.filter(b => b.id !== id);
};
