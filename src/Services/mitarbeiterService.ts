// Beispiel-Datenbank (kann später durch echte DB ersetzt werden)
interface Mitarbeiter {
  id: string;
  name: string;
  rolle: string;
  abteilung: string;
}

let mitarbeiterListe: Mitarbeiter[] = [
  { id: '1', name: 'Max Mustermann', rolle: 'Mitarbeiter', abteilung: 'Lager' },
  { id: '2', name: 'Erika Beispiel', rolle: 'Teamleiter', abteilung: 'Vertrieb' }
];

// Alle Mitarbeiter abrufen
export const getAll = async (): Promise<Mitarbeiter[]> => {
  return mitarbeiterListe;
};

// Mitarbeiter nach ID abrufen
export const getById = async (id: string): Promise<Mitarbeiter | undefined> => {
  return mitarbeiterListe.find(m => m.id === id);
};

// Neuen Mitarbeiter erstellen
export const create = async (daten: Omit<Mitarbeiter, 'id'>): Promise<Mitarbeiter> => {
  const neuerMitarbeiter: Mitarbeiter = {
    id: (mitarbeiterListe.length + 1).toString(),
    ...daten
  };
  mitarbeiterListe.push(neuerMitarbeiter);
  return neuerMitarbeiter;
};

// Mitarbeiter aktualisieren
export const update = async (id: string, daten: Partial<Mitarbeiter>): Promise<Mitarbeiter | null> => {
  const index = mitarbeiterListe.findIndex(m => m.id === id);
  if (index === -1) return null;

  mitarbeiterListe[index] = { ...mitarbeiterListe[index], ...daten };
  return mitarbeiterListe[index];
};

// Mitarbeiter löschen
export const remove = async (id: string): Promise<boolean> => {
  const index = mitarbeiterListe.findIndex(m => m.id === id);
  if (index === -1) return false;

  mitarbeiterListe.splice(index, 1);
  return true;
};
