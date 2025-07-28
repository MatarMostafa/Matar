import { Mitarbeiter } from '../Types/mitarbeiter';

export const mitarbeiterData: Mitarbeiter[] = [
  {
    id: '1',
    name: 'Ali Mustermann',
    email: 'ali@example.com',
    role: 'Mitarbeiter',
    aktiv: true,
    qualifikationen: ['Lager', 'Transport'],
    option: 'A'
  },
  {
    id: '2',
    name: 'Sara Beispiel',
    email: 'sara@example.com',
    role: 'Mitarbeiter',
    aktiv: true,
    qualifikationen: ['Reinigung'],
    option: 'B'
  }
];