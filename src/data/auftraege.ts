import { Auftrag } from '../types/auftrag';

export const auftragData: Auftrag[] = [
  {
    id: 'a1',
    titel: 'Büroreinigung',
    taetigkeit: 'Reinigung von Büroflächen',
    uhrzeit: '08:00',
    standort: 'Musterstraße 1, Berlin',
    bushaltestelle: 'Hauptbahnhof',
    mitarbeiterAnzahl: 2
  },
  {
    id: 'a2',
    titel: 'Gartenpflege',
    taetigkeit: 'Rasen mähen und Hecke schneiden',
    uhrzeit: '10:00',
    standort: 'Gartenweg 5, Köln',
    bushaltestelle: 'Bahnhof Köln Süd',
    mitarbeiterAnzahl: 3
  }
];