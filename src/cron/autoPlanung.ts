import cron from "node-cron";
import { automatischEinplanen } from "../Controllers/AdminController";

// Täglich um 18:30 Uhr automatisch starten
cron.schedule("30 18 * * *", () => {
  console.log("🔁 Starte automatische Planung um 18:30 Uhr...");
  automatischEinplanenIntern();
});

// Variante ohne Express-Request/Response
function automatischEinplanenIntern() {
  // Hier kopierst du den Inhalt von „automatischEinplanen()“
  // Nur ohne `res.json(...)` sondern einfach console.log(log)
}
// src/cron/autoPlanung.ts

import cron from "node-cron";
import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";

console.log("⏰ Cronjob wird initialisiert...");

// Jeden Tag um 18:30 Uhr automatisch ausführen
cron.schedule("30 18 * * *", () => {
  console.log("🕡 Starte automatische Einplanung...");

  auftraege.forEach((auftrag) => {
    if (
      auftrag.status === "offen" &&
      (!auftrag.eingeteilteMitarbeiter || auftrag.eingeteilteMitarbeiter.length === 0)
    ) {
      const benoetigt = auftrag.anzahlMitarbeiter;
      const geeignete = mitarbeiter
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
      } else {
        console.log(`⚠️ Auftrag ${auftrag.id}: Keine geeigneten Mitarbeiter verfügbar.`);
      }
    }
  });

  console.log("✅ Automatische Einplanung abgeschlossen.");
});

function prioritaetScore(kategorie: string): number {
  switch (kategorie) {
    case "vollzeit": return 1;
    case "teilzeit": return 2;
    case "minijob": return 3;
    default: return 99;
  }
}