"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meldenAbwesenheit = void 0;
const benachrichtigungService_1 = require("../Services/benachrichtigungService");
const mitarbeiter_1 = require("../data/mitarbeiter");
const meldenAbwesenheit = (eintrag) => {
    const mitarbeiterInfo = mitarbeiter_1.mitarbeiterListe.find((m) => m.id === eintrag.mitarbeiterId);
    if (!mitarbeiterInfo)
        return;
    const titel = "Abwesenheit erfasst";
    const nachricht = `${mitarbeiterInfo.vorname} ${mitarbeiterInfo.nachname} ist am ${eintrag.datum} abwesend (${eintrag.typ}).`;
    (0, benachrichtigungService_1.sendNotificationToUser)(mitarbeiterInfo.id, titel, nachricht);
};
exports.meldenAbwesenheit = meldenAbwesenheit;
