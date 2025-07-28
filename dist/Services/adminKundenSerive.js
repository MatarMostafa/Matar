"use strict";
// src/Services/adminKundenService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUnteraccount = exports.addUnteraccount = exports.addKunde = exports.getAlleKunden = void 0;
let kunden = [
    {
        id: 1,
        hauptEmail: "firma@example.com",
        unteraccounts: [
            { id: 1, email: "mitarbeiter1@firma.com", passwort: "passwort123" },
        ],
    },
];
// Alle Kunden abrufen
const getAlleKunden = () => {
    return kunden;
};
exports.getAlleKunden = getAlleKunden;
// Neuen Kunden hinzufügen
const addKunde = (hauptEmail) => {
    const neuerKunde = {
        id: kunden.length + 1,
        hauptEmail,
        unteraccounts: [],
    };
    kunden.push(neuerKunde);
    return neuerKunde;
};
exports.addKunde = addKunde;
// Unteraccount zu Kunde hinzufügen
const addUnteraccount = (kundeId, email, passwort) => {
    const kunde = kunden.find(k => k.id === kundeId);
    if (!kunde)
        return null;
    const neuerAccount = {
        id: Date.now(), // einfache ID-Generierung
        email,
        passwort,
    };
    kunde.unteraccounts.push(neuerAccount);
    return neuerAccount;
};
exports.addUnteraccount = addUnteraccount;
// Unteraccount löschen
const deleteUnteraccount = (kundeId, unteraccountId) => {
    const kunde = kunden.find(k => k.id === kundeId);
    if (!kunde)
        return false;
    const index = kunde.unteraccounts.findIndex(ua => ua.id === unteraccountId);
    if (index === -1)
        return false;
    kunde.unteraccounts.splice(index, 1);
    return true;
};
exports.deleteUnteraccount = deleteUnteraccount;
