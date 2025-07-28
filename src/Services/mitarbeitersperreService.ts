// src/Services/mitarbeitersperreService.ts

interface Mitarbeitersperre {
  id: number;
  mitarbeiterId: number;
  startDatum: string;
  endDatum: string;
  grund: string;
}

let mitarbeitersperren: Mitarbeitersperre[] = [];
let aktuelleId = 1;

// Neue Sperre anlegen
export const sperreErstellen = (daten: Omit<Mitarbeitersperre, "id">): Mitarbeitersperre => {
  const neueSperre: Mitarbeitersperre = {
    id: aktuelleId++,
    ...daten,
  };
  mitarbeitersperren.push(neueSperre);
  return neueSperre;
};

// Alle Sperren holen
export const alleSperren = (): Mitarbeitersperre[] => {
  return mitarbeitersperren;
};

// Einzelne Sperre abrufen
export const sperreNachId = (id: number): Mitarbeitersperre | undefined => {
  return mitarbeitersperren.find((s) => s.id === id);
};

// Sperre aktualisieren
export const sperreAktualisieren = (id: number, daten: Partial<Mitarbeitersperre>): Mitarbeitersperre | null => {
  const index = mitarbeitersperren.findIndex((s) => s.id === id);
  if (index === -1) return null;

  mitarbeitersperren[index] = { ...mitarbeitersperren[index], ...daten };
  return mitarbeitersperren[index];
};

// Sperre löschen
export const sperreLoeschen = (id: number): boolean => {
  const startLength = mitarbeitersperren.length;
  mitarbeitersperren = mitarbeitersperren.filter((s) => s.id !== id);
  return mitarbeitersperren.length < startLength;
};

// Prüfung: Ist Mitarbeiter im Zeitraum gesperrt?
export const istGesperrt = (mitarbeiterId: number, datum: string): boolean => {
  return mitarbeitersperren.some((s) => {
    return (
      s.mitarbeiterId === mitarbeiterId &&
      datum >= s.startDatum &&
      datum <= s.endDatum
    );
  });
};
// src/Services/mitarbeitersperreService.ts

import { sperren, Mitarbeitersperre } from "../data/sperren";

export const getAlleSperren = (): Mitarbeitersperre[] => {
  return sperren;
};

export const erstelleSperre = (sperre: Omit<Mitarbeitersperre, "id">): Mitarbeitersperre => {
  const neueSperre: Mitarbeitersperre = {
    id: sperren.length + 1,
    ...sperre,
  };
  sperren.push(neueSperre);
  return neueSperre;
};

export const istGesperrt = (mitarbeiterId: number, datum: string): boolean => {
  return sperren.some((s) =>
    s.mitarbeiterId === mitarbeiterId &&
    datum >= s.von &&
    datum <= s.bis
  );
};