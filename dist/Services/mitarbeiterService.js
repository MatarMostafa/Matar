"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
let mitarbeiterListe = [
    { id: '1', name: 'Max Mustermann', rolle: 'Mitarbeiter', abteilung: 'Lager' },
    { id: '2', name: 'Erika Beispiel', rolle: 'Teamleiter', abteilung: 'Vertrieb' }
];
// Alle Mitarbeiter abrufen
const getAll = async () => {
    return mitarbeiterListe;
};
exports.getAll = getAll;
// Mitarbeiter nach ID abrufen
const getById = async (id) => {
    return mitarbeiterListe.find(m => m.id === id);
};
exports.getById = getById;
// Neuen Mitarbeiter erstellen
const create = async (daten) => {
    const neuerMitarbeiter = {
        id: (mitarbeiterListe.length + 1).toString(),
        ...daten
    };
    mitarbeiterListe.push(neuerMitarbeiter);
    return neuerMitarbeiter;
};
exports.create = create;
// Mitarbeiter aktualisieren
const update = async (id, daten) => {
    const index = mitarbeiterListe.findIndex(m => m.id === id);
    if (index === -1)
        return null;
    mitarbeiterListe[index] = { ...mitarbeiterListe[index], ...daten };
    return mitarbeiterListe[index];
};
exports.update = update;
// Mitarbeiter löschen
const remove = async (id) => {
    const index = mitarbeiterListe.findIndex(m => m.id === id);
    if (index === -1)
        return false;
    mitarbeiterListe.splice(index, 1);
    return true;
};
exports.remove = remove;
