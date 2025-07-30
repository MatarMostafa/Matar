import { Auftrag } from '../types/auftrag';

export const auftraege: Auftrag[] = [
  {
    id: 1,
    kundeId: 1,
    mitarbeiterId: 2,
    kunde: 'Muster GmbH',
    beschreibung: 'Reinigung Büro',
    status: 'offen',
    datum: '2025-07-30'
  },
  {
    id: 2,
    kundeId: 2,
    mitarbeiterId: 3,
    kunde: 'Beispiel AG',
    beschreibung: 'Gartenpflege',
    status: 'in Bearbeitung',
    datum: '2025-07-31'
  },
  {
    id: 3,
    kundeId: 3,
    mitarbeiterId: 4,
    kunde: 'Testfirma KG',
    beschreibung: 'Winterdienst',
    status: 'abgeschlossen',
    datum: '2025-08-01'
  }
];