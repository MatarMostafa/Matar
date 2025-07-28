"use strict";
// src/Services/adminStatistikService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.berechneAdminStatistiken = exports.getAdminStatistik = void 0;
const auftraege_1 = require("../data/auftraege");
const mitarbeiter_1 = require("../data/mitarbeiter");
const abwesenheiten_1 = require("../data/abwesenheiten");
const getAdminStatistik = () => {
    const anzahlAuftraege = auftraege_1.auftraege.length;
    const anzahlMitarbeiter = mitarbeiter_1.mitarbeiter.length;
    const anzahlKrank = abwesenheiten_1.abwesenheiten.filter((a) => a.typ === "krank").length;
    const anzahlUrlaub = abwesenheiten_1.abwesenheiten.filter((a) => a.typ === "urlaub").length;
    const offeneAuftraege = auftraege_1.auftraege.filter((a) => a.status === "offen").length;
    const erledigteAuftraege = auftraege_1.auftraege.filter((a) => a.status === "erledigt").length;
    return {
        anzahlAuftraege,
        anzahlMitarbeiter,
        offeneAuftraege,
        erledigteAuftraege,
        krankmeldungen: anzahlKrank,
        urlaubstage: anzahlUrlaub,
    };
};
exports.getAdminStatistik = getAdminStatistik;
const berechneAdminStatistiken = () => {
    const gesamtAuftraege = auftraege_1.auftraege.length;
    const erledigt = auftraege_1.auftraege.filter(a => a.status === "erledigt").length;
    const offen = auftraege_1.auftraege.filter(a => a.status === "offen").length;
    const gesamtMitarbeiter = mitarbeiter_1.mitarbeiter.length;
    return {
        gesamtAuftraege,
        erledigteAuftraege: erledigt,
        offeneAuftraege: offen,
        gesamtMitarbeiter
    };
};
exports.berechneAdminStatistiken = berechneAdminStatistiken;
