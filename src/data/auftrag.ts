// src/data/auftraege.ts

import { Auftrag } from '../types/auftrag';

export const auftraegeListe: Auftrag[] = [
  {
    id: 'a1',
    taetigkeit: 'Reinigung',
    standort: 'Berlin Zentrum',
    bushaltestelle: 'Alexanderplatz',
    uhrzeit: '08:00',
    datum: '2025-08-01',
    mitarbeiterAnzahl: 2,
    mitarbeiterIds: ['1'],
    qualifikationen: ['putzen']
  }
];
