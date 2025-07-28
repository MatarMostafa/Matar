"use strict";
// src/Services/pdfExportService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuftragPDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Beispielhafte Funktion zum PDF-Export eines Auftragsberichts
const generateAuftragPDF = (auftrag) => {
    const doc = new pdfkit_1.default();
    const filename = `auftrag_${auftrag.id}.pdf`;
    const filepath = path_1.default.join(__dirname, "../../exports", filename);
    const writeStream = fs_1.default.createWriteStream(filepath);
    doc.pipe(writeStream);
    doc.fontSize(20).text("Auftragsbericht", { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Auftrag-ID: ${auftrag.id}`);
    doc.text(`Kunde: ${auftrag.kunde}`);
    doc.text(`Datum: ${auftrag.datum}`);
    doc.text(`Beschreibung: ${auftrag.beschreibung}`);
    doc.text(`Status: ${auftrag.status}`);
    doc.end();
    return filename; // Der Name des generierten PDF
};
exports.generateAuftragPDF = generateAuftragPDF;
