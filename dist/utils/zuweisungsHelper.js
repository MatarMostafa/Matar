"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findeGeeigneteMitarbeiter = findeGeeigneteMitarbeiter;
const mitarbeiterQualifikationen_1 = require("../data/mitarbeiterQualifikationen");
const auftragQualifikationen_1 = require("../data/auftragQualifikationen");
function findeGeeigneteMitarbeiter(auftragId, mitarbeiterListe) {
    const benoetigteQualis = auftragQualifikationen_1.auftragQualifikationen
        .filter(q => q.auftragId === auftragId)
        .map(q => q.qualifikationId);
    return mitarbeiterListe.filter(m => {
        const mitarbeiterQualis = mitarbeiterQualifikationen_1.mitarbeiterQualifikationen
            .filter(mq => mq.mitarbeiterId === m.id)
            .map(mq => mq.qualifikationId);
        // Prüfe, ob alle benötigten Qualis vorhanden sind
        return benoetigteQualis.every(q => mitarbeiterQualis.includes(q));
    });
}
