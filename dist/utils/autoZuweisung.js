"use strict";
// src/Utils/autoZuweisung.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.findePassendeMitarbeiter = findePassendeMitarbeiter;
exports.findePassendeMitarbeiter = findePassendeMitarbeiter;
const mitarbeiter_1 = require("../data/mitarbeiter");
function findePassendeMitarbeiter(benötigteQualifikationen) {
    return mitarbeiter_1.mitarbeiter.filter((m) => benötigteQualifikationen.every((qId) => m.qualifikationen.includes(qId)) &&
        m.verfügbar);
}
const ausfaelle_1 = require("../data/ausfaelle");
function findePassendeMitarbeiter(benötigteQualifikationen) {
    return mitarbeiter_1.mitarbeiter.filter((m) => m.verfügbar &&
        !ausfaelle_1.gesperrteMitarbeiter.includes(m.id) &&
        benötigteQualifikationen.every((qId) => m.qualifikationen.includes(qId)));
}
