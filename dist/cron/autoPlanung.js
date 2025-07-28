"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
// Täglich um 18:30 Uhr automatisch starten
node_cron_1.default.schedule("30 18 * * *", () => {
    console.log("🔁 Starte automatische Planung um 18:30 Uhr...");
    automatischEinplanenIntern();
});
// Variante ohne Express-Request/Response
function automatischEinplanenIntern() {
    // Hier kopierst du den Inhalt von „automatischEinplanen()“
    // Nur ohne `res.json(...)` sondern einfach console.log(log)
}
const auftraege_1 = require("../data/auftraege");
const mitarbeiter_1 = require("../data/mitarbeiter");
console.log("⏰ Cronjob wird initialisiert...");
// Jeden Tag um 18:30 Uhr automatisch ausführen
node_cron_1.default.schedule("30 18 * * *", () => {
    console.log("🕡 Starte automatische Einplanung...");
    auftraege_1.auftraege.forEach((auftrag) => {
        if (auftrag.status === "offen" &&
            (!auftrag.eingeteilteMitarbeiter || auftrag.eingeteilteMitarbeiter.length === 0)) {
            const benoetigt = auftrag.anzahlMitarbeiter;
            const geeignete = mitarbeiter_1.mitarbeiter
                .filter((m) => m.verfuegbar && m.qualifikationen?.includes(auftrag.qualifikation))
                .sort((a, b) => {
                const pA = prioritaetScore(a.kategorie);
                const pB = prioritaetScore(b.kategorie);
                return pA - pB; // Höchste Priorität zuerst
            })
                .slice(0, benoetigt);
            if (geeignete.length > 0) {
                auftrag.eingeteilteMitarbeiter = geeignete.map((m) => ({
                    mitarbeiterId: m.id,
                    status: "offen",
                }));
                auftrag.status = "geplant";
                console.log(`✅ Auftrag ${auftrag.id}: ${geeignete.length} Mitarbeiter automatisch zugeteilt.`);
            }
            else {
                console.log(`⚠️ Auftrag ${auftrag.id}: Keine geeigneten Mitarbeiter verfügbar.`);
            }
        }
    });
    console.log("✅ Automatische Einplanung abgeschlossen.");
});
function prioritaetScore(kategorie) {
    switch (kategorie) {
        case "vollzeit": return 1;
        case "teilzeit": return 2;
        case "minijob": return 3;
        default: return 99;
    }
}
