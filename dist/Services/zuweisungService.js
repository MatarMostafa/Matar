"use strict";
// src/Services/zuweisungsService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.findePassendeMitarbeiter = void 0;
const mitarbeiter_1 = require("../data/mitarbeiter");
const mitarbeiterQualifikationen_1 = require("../data/mitarbeiterQualifikationen");
const auftraege_1 = require("../data/auftraege");
const findePassendeMitarbeiter = (auftragId) => {
    const auftrag = auftraege_1.auftraege.find((a) => a.id === auftragId);
    if (!auftrag)
        return [];
    const passendeMitarbeiter = mitarbeiter_1.mitarbeiter.filter((m) => {
        // ❌ Sperre oder Abwesenheit prüfen
        if (m.gesperrt || m.abwesend)
            return false;
        // ❌ Zeitkonflikt prüfen
        const hatKonflikt = auftraege_1.auftraege.some((a) => a.mitarbeiterId === m.id &&
            a.datum === auftrag.datum &&
            a.zeitfenster === auftrag.zeitfenster);
        if (hatKonflikt)
            return false;
        // ✅ Qualifikation prüfen
        const qualifiziert = mitarbeiterQualifikationen_1.mitarbeiterQualifikationen.some((q) => q.mitarbeiterId === m.id &&
            q.qualifikationId === auftrag.benoetigteQualifikationId);
        return qualifiziert;
    });
    return passendeMitarbeiter.map((m) => m.id);
};
exports.findePassendeMitarbeiter = findePassendeMitarbeiter;
