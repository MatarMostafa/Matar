"use strict";
// src/Utils/csvExporter.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportiereAuftraegeAlsCSV = void 0;
const auftraege_1 = require("../data/auftraege");
const json2csv_1 = require("json2csv");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const exportiereAuftraegeAlsCSV = () => {
    const fields = ["id", "datum", "kundeId", "mitarbeiterId", "beschreibung", "status"];
    const opts = { fields };
    try {
        const csv = (0, json2csv_1.parse)(auftraege_1.auftraege, opts);
        const exportPfad = path_1.default.join(__dirname, "../../exports/auftraege_export.csv");
        fs_1.default.writeFileSync(exportPfad, csv, "utf8");
        console.log("✅ Aufträge als CSV exportiert:", exportPfad);
        return exportPfad;
    }
    catch (err) {
        console.error("❌ Fehler beim Exportieren:", err);
        return "";
    }
};
exports.exportiereAuftraegeAlsCSV = exportiereAuftraegeAlsCSV;
