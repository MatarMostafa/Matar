// src/data/ampelBewertungen.ts

import { Bewertung } from '../types/bewertung';

export const bewertungenMock: Bewertung[] = [
  {
    id: '1',
    mitarbeiterId: '101',
    status: 'grün',
    kommentar: 'Sehr zuverlässig'
  },
  {
    id: '2',
    mitarbeiterId: '102',
    status: 'gelb',
    kommentar: 'Kleine Verspätung'
  },
  {
    id: '3',
    mitarbeiterId: '103',
    status: 'rot',
    kommentar: 'Nicht erschienen'
  }
];