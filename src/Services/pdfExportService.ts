// src/Services/pdfExportService.ts

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// Beispielhafte Funktion zum PDF-Export eines Auftragsberichts
export const generateAuftragPDF = (auftrag: any): string => {
  const doc = new PDFDocument();
  const filename = `auftrag_${auftrag.id}.pdf`;
  const filepath = path.join(__dirname, "../../exports", filename);

  const writeStream = fs.createWriteStream(filepath);
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