"use strict";
// src/Services/kundenService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnteraccountsFuerKunde = exports.findeUnteraccount = exports.fuegeUnteraccountHinzu = exports.getAlleKunden = exports.erstelleKunde = void 0;
let kunden = [];
let kundeId = 1;
let unteraccountId = 1;
// Kunden erstellen
const erstelleKunde = (firmenname, email) => {
    const neuerKunde = {
        id: kundeId++,
        firmenname,
        email,
        unteraccounts: [],
    };
    kunden.push(neuerKunde);
    return neuerKunde;
};
exports.erstelleKunde = erstelleKunde;
// Alle Kunden abrufen
const getAlleKunden = () => {
    return kunden;
};
exports.getAlleKunden = getAlleKunden;
// Unteraccount hinzufügen
const fuegeUnteraccountHinzu = (kundeId, name, email) => {
    const kunde = kunden.find((k) => k.id === kundeId);
    if (!kunde)
        return null;
    const neuerUnteraccount = {
        id: unteraccountId++,
        name,
        email,
    };
    kunde.unteraccounts.push(neuerUnteraccount);
    return neuerUnteraccount;
};
exports.fuegeUnteraccountHinzu = fuegeUnteraccountHinzu;
let kunden = [
    {
        id: 1,
        hauptEmail: "firma@example.com",
        unteraccounts: [
            { id: 1, email: "mitarbeiter1@firma.com", passwort: "passwort123" },
            { id: 2, email: "mitarbeiter2@firma.com", passwort: "passwort456" },
        ],
    },
];
const findeUnteraccount = (email, passwort) => {
    for (const kunde of kunden) {
        const account = kunde.unteraccounts.find((ua) => ua.email === email && ua.passwort === passwort);
        if (account) {
            return { kundeId: kunde.id, unteraccount: account };
        }
    }
    return null;
};
exports.findeUnteraccount = findeUnteraccount;
const getUnteraccountsFuerKunde = (kundeId) => {
    const kunde = kunden.find(k => k.id === kundeId);
    return kunde ? kunde.unteraccounts : [];
};
exports.getUnteraccountsFuerKunde = getUnteraccountsFuerKunde;
