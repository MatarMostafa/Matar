"use strict";
// src/Utils/fallbackSystem.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallbackPruefenUndZuweisen = fallbackPruefenUndZuweisen;
exports.fallbackZuweisung = fallbackZuweisung;
exports.ersetzeAusgefalleneMitarbeiter = ersetzeAusgefalleneMitarbeiter;
const auftraege_1 = require("../data/auftraege");
const bewertungen_1 = require("../data/bewertungen");
const mitarbeiter_1 = require("../data/mitarbeiter");
const zuweisungen_1 = require("../data/zuweisungen");
function fallbackPruefenUndZuweisen() {
    const ausfaelle = bewertungen_1.bewertungen.filter(b => b.status === "rot");
    ausfaelle.forEach(ausfall => {
        const betroffeneAuftraege = auftraege_1.auftraege.filter(a => a.mitarbeiterId === ausfall.mitarbeiterId);
        betroffeneAuftraege.forEach(auftrag => {
            const passendeErsatzkandidaten = mitarbeiter_1.mitarbeiter.filter(m => {
                // Nicht der ausgefallene
                if (m.id === ausfall.mitarbeiterId)
                    return false;
                // Noch nicht zugewiesen
                const bereitsZugewiesen = auftraege_1.auftraege.some(a => a.mitarbeiterId === m.id && a.datum === auftrag.datum);
                if (bereitsZugewiesen)
                    return false;
                // Hat die Qualifikation?
                const maQualis = zuweisungen_1.zuweisungen.filter(z => z.mitarbeiterId === m.id).map(z => z.qualifikation);
                return maQualis.includes(auftrag.benoetigteQualifikation);
            });
            if (passendeErsatzkandidaten.length > 0) {
                const ersatz = passendeErsatzkandidaten[0];
                console.log(`⚠️ Ersatz für Auftrag ${auftrag.id}: ${ersatz.vorname} ${ersatz.nachname}`);
                // Mitarbeiter im Auftrag ersetzen
                auftrag.mitarbeiterId = ersatz.id;
            }
        });
    });
}
const krankmeldungen_1 = require("../data/krankmeldungen");
const urlaube_1 = require("../data/urlaube");
const fallbackPruefenUndZuweisen = (datum) => {
    const betroffeneMitarbeiter = [];
    // Alle krankgemeldeten IDs für das Datum sammeln
    krankmeldungen_1.krankmeldungen.forEach(k => {
        if (k.datum === datum)
            betroffeneMitarbeiter.push(k.mitarbeiterId);
    });
    // Alle urlaubsbedingten Ausfälle sammeln
    urlaube_1.urlaube.forEach(u => {
        if (datum >= u.von && datum <= u.bis) {
            betroffeneMitarbeiter.push(u.mitarbeiterId);
        }
    });
    // Fallback-Zuweisung prüfen
    betroffeneMitarbeiter.forEach(ausgefallenId => {
        const ursprünglicheZuweisung = zuweisungen_1.zuweisungen.find(z => z.mitarbeiterId === ausgefallenId && z.datum === datum);
        if (ursprünglicheZuweisung) {
            const ersatz = mitarbeiter_1.mitarbeiter.find(m => !betroffeneMitarbeiter.includes(m.id) &&
                m.rolle === ursprünglicheZuweisung.rolle &&
                m.verfuegbar === true);
            if (ersatz) {
                zuweisungen_1.zuweisungen.push({
                    datum,
                    mitarbeiterId: ersatz.id,
                    rolle: ursprünglicheZuweisung.rolle,
                });
                console.log(`🔄 Ersatz zugewiesen: ${ersatz.id} für ausgefallenen MA ${ausgefallenId} am ${datum}`);
            }
            else {
                console.log(`⚠️ Kein Ersatz verfügbar für ${ausgefallenId} am ${datum}`);
            }
        }
    });
};
exports.fallbackPruefenUndZuweisen = fallbackPruefenUndZuweisen;
const users_1 = require("../data/users");
const abwesenheiten_1 = require("../data/abwesenheiten"); // dort stehen Krank/Urlaub
// Helferfunktion: Ist Mitarbeiter abwesend am Datum?
function istAbwesend(mitarbeiterId, datum) {
    return abwesenheiten_1.abwesenheiten.some((a) => a.mitarbeiterId === mitarbeiterId && a.datum === datum);
}
// Fallback ausführen für einen bestimmten Tag
function fallbackZuweisung(datum) {
    let ersetzte = 0;
    auftraege_1.auftraege.forEach((auftrag) => {
        if (auftrag.datum !== datum || !auftrag.mitarbeiterIds)
            return;
        const neueZuweisung = [];
        auftrag.mitarbeiterIds.forEach((mid) => {
            if (!istAbwesend(mid, datum)) {
                neueZuweisung.push(mid); // bleibt drin
            }
            else {
                const ersatz = users_1.users.find((u) => u.role === "mitarbeiter" &&
                    !istAbwesend(u.id, datum) &&
                    !auftrag.mitarbeiterIds?.includes(u.id));
                if (ersatz) {
                    neueZuweisung.push(ersatz.id);
                    ersetzte++;
                }
            }
        });
        auftrag.mitarbeiterIds = neueZuweisung;
    });
    return ersetzte;
}
const abwesenheiten_2 = require("../data/abwesenheiten");
const benachrichtigungen_1 = require("../data/benachrichtigungen");
function ersetzeAusgefalleneMitarbeiter() {
    const heute = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    auftraege_1.auftraege.forEach((auftrag) => {
        if (auftrag.datum !== heute)
            return;
        const mitarbeiterId = auftrag.mitarbeiterId;
        const istAbwesend = abwesenheiten_2.mitarbeiterAbwesenheiten.some((a) => a.mitarbeiterId === mitarbeiterId && a.datum === heute);
        if (!istAbwesend)
            return;
        const ersatz = mitarbeiter_1.mitarbeiter.find((m) => m.id !== mitarbeiterId &&
            !abwesenheiten_2.mitarbeiterAbwesenheiten.some((a) => a.mitarbeiterId === m.id && a.datum === heute) &&
            m.qualifikationen.includes(auftrag.benoetigteQualifikation));
        if (ersatz) {
            const vorher = auftrag.mitarbeiterId;
            auftrag.mitarbeiterId = ersatz.id;
            benachrichtigungen_1.benachrichtigungen.push({
                id: benachrichtigungen_1.benachrichtigungen.length + 1,
                empfängerId: ersatz.id,
                inhalt: `⚠️ Fallback: Du wurdest für den Auftrag am ${auftrag.datum} eingeteilt (Ersatz für MA ${vorher})`,
                gelesen: false,
                zeitpunkt: new Date(),
            });
        }
    });
}
