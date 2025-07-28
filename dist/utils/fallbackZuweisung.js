"use strict";
// src/Utils/fallbackZuweisung.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ersatzMitarbeiterZuweisen = void 0;
const auftraege_1 = require("../data/auftraege");
const mitarbeiter_1 = require("../data/mitarbeiter");
const benachrichtigung_1 = require("./benachrichtigung");
const ersatzMitarbeiterZuweisen = (datum, mitarbeiterId) => {
    console.log(`⚠ Fallback-Auslösung für ${datum}, ausgefallener MA: ${mitarbeiterId}`);
    const auftrag = auftraege_1.auftraege.find((a) => a.datum === datum && a.mitarbeiterId === mitarbeiterId);
    if (!auftrag) {
        console.log(`❌ Kein passender Auftrag gefunden.`);
        return;
    }
    const ersatz = mitarbeiter_1.mitarbeiter.find((m) => m.id !== mitarbeiterId &&
        !(m.sperrungen || []).includes(datum));
    if (ersatz) {
        auftrag.mitarbeiterId = ersatz.id;
        (0, benachrichtigung_1.sendeBenachrichtigung)(ersatz.email, `Sie wurden als Ersatz für den Auftrag am ${datum} eingeteilt.`);
        console.log(`✅ Ersatzmitarbeiter ${ersatz.name} zugewiesen.`);
    }
    else {
        console.log("⚠ Kein Ersatzmitarbeiter verfügbar.");
    }
};
exports.ersatzMitarbeiterZuweisen = ersatzMitarbeiterZuweisen;
