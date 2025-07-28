"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportiereAuftraegeAlsCSV = exports.exportiereCSV = exports.exportiereJSON = void 0;
// JSON Export
const exportiereJSON = async (_req, res) => {
    try {
        const daten = [{ id: 1, name: "Beispielauftrag" }];
        res.json(daten);
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim JSON-Export" });
    }
};
exports.exportiereJSON = exportiereJSON;
// CSV Export (nur als Textbeispiel)
const exportiereCSV = async (_req, res) => {
    try {
        const csv = "ID,Name\n1,Beispielauftrag";
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=export.csv");
        res.send(csv);
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim CSV-Export" });
    }
};
exports.exportiereCSV = exportiereCSV;
// Erweiterter CSV Export für Aufträge
const exportiereAuftraegeAlsCSV = async (_req, res) => {
    try {
        const csv = "AuftragID,Beschreibung\n1001,Testauftrag";
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=auftraege.csv");
        res.send(csv);
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim Auftragsexport" });
    }
};
exports.exportiereAuftraegeAlsCSV = exportiereAuftraegeAlsCSV;
