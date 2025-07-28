"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportAuftraegeAlsCSV = exportAuftraegeAlsCSV;
function exportAuftraegeAlsCSV(auftraege) {
    const header = [
        "ID", "Tätigkeit", "Ort", "Datum", "Uhrzeit",
        "Dauer", "Mitarbeiteranzahl", "Qualifikation", "Status", "Erstellt von"
    ];
    const rows = auftraege.map(a => [
        a.id,
        a.taetigkeit,
        a.ort,
        a.datum,
        a.uhrzeit,
        a.dauer,
        a.anzahlMitarbeiter,
        a.qualifikation || "",
        a.status,
        a.erstelltVon
    ]);
    const csv = [header, ...rows].map(r => r.join(";")).join("\n");
    return csv;
}
