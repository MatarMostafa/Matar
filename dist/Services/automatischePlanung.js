"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.automatischePlanung = void 0;
const auftraege_1 = require("../data/auftraege");
const mitarbeiter_1 = require("../data/mitarbeiter");
const automatischePlanung = () => {
    const heute = new Date().toISOString().split("T")[0];
    for (const auftrag of auftraege_1.auftraege) {
        // Nur offene Aufträge mit heutigem Datum und noch keiner Zuteilung
        if (auftrag.status === "offen" &&
            auftrag.datum === heute &&
            (!auftrag.eingeteilteMitarbeiter || auftrag.eingeteilteMitarbeiter.length === 0)) {
            const benoetigt = auftrag.anzahlMitarbeiter;
            // Freie Mitarbeiter (nicht bereits eingeplant)
            const freieMitarbeiter = mitarbeiter_1.mitarbeiter.filter((m) => {
                const istEingeteilt = auftraege_1.auftraege.some((a) => a.eingeteilteMitarbeiter?.some((em) => em.mitarbeiterId === m.id && a.datum === heute));
                return !istEingeteilt;
            });
            // Nach Priorität sortieren
            const priorisiert = [
                ...freieMitarbeiter.filter((m) => m.kategorie === "vollzeit"),
                ...freieMitarbeiter.filter((m) => m.kategorie === "teilzeit"),
                ...freieMitarbeiter.filter((m) => m.kategorie === "minijob"),
            ];
            const zuWeisung = priorisiert.slice(0, benoetigt);
            auftrag.eingeteilteMitarbeiter = zuWeisung.map((m) => ({
                mitarbeiterId: m.id,
                status: "automatisch",
            }));
            auftrag.status = "geplant";
            console.log(`🔄 Auftrag #${auftrag.id} automatisch geplant mit ${zuWeisung.length} Mitarbeiter(n).`);
        }
    }
};
exports.automatischePlanung = automatischePlanung;
