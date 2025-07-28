"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKundenUebersicht = void 0;
// Beispiel-Daten
const kundenListe = [
    { id: 1, name: "Kunde A", status: "aktiv", auftraege: 12 },
    { id: 2, name: "Kunde B", status: "inaktiv", auftraege: 5 }
];
// Controller: Kundenübersicht
const getKundenUebersicht = async (_req, res) => {
    try {
        res.json(kundenListe);
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim Laden der Kundenübersicht" });
    }
};
exports.getKundenUebersicht = getKundenUebersicht;
