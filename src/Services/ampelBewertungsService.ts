import { Bewertung } from '../types/bewertung';
import { v4 as uuidv4 } from 'uuid';

let bewertungen: Bewertung[] = [];

export const getAllBewertungen = () => {
  return bewertungen;
};

export const getBewertungenByMitarbeiter = (mitarbeiterId: string) => {
  return bewertungen.filter(b => b.mitarbeiterId === mitarbeiterId);
};

export const createBewertung = (data: Bewertung) => {
  const neueBewertung: Bewertung = { ...data, id: uuidv4() };
  bewertungen.push(neueBewertung);
  return neueBewertung;
};

export const deleteBewertung = (id: string) => {
  const index = bewertungen.findIndex(b => b.id === id);
  if (index !== -1) {
    const deleted = bewertungen.splice(index, 1)[0];
    return deleted;
  }
  return null;
};