"use strict";
// src/Services/exportService.ts
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
    const fields = ["id", "kundeId", "datum", "mitarbeiterId", "status"];
    const parser = new json2csv_1.Parser({ fields });
    const csv = parser.parse(auftraege_1.auftraege);
    const dateipfad = path_1.default.join(__dirname, "../../exports/auftraege_export.csv");
    fs_1.default.writeFileSync(dateipfad, csv);
    return dateipfad;
};
exports.exportiereAuftraegeAlsCSV = exportiereAuftraegeAlsCSV;
