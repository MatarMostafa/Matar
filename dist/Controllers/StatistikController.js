"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportiereAuftraegeCSV = exports.getDurchschnittswerte = exports.getAmpelStatistik = exports.getMitarbeiterEinsaetze = exports.getMitarbeiterStunden = exports.getAdminStatistik = exports.exportiereAuftraege = exports.getStundenProMitarbeiter = exports.getKundenStatistik = exports.getGesamtStatistik = void 0;
const auftraege_1 = require("../data/auftraege");
// (1) Gesamteinsatzstatistik: Anzahl Aufträge, benötigte Mitarbeiter usw.
const getGesamtStatistik = (req, res) => {
    const anzahlAuftraege = auftraege_1.auftraege.length;
    const gesamtMitarbeiter = auftraege_1.auftraege.reduce((summe, a) => summe + (a.anzahlMitarbeiter || 0), 0);
    res.json({
        anzahlAuftraege,
        gesamtMitarbeiter,
        durchschnittProAuftrag: anzahlAuftraege > 0 ? +(gesamtMitarbeiter / anzahlAuftraege).toFixed(2) : 0,
    });
};
exports.getGesamtStatistik = getGesamtStatistik;
// (2) Kundenbezogene Statistik: Aufträge dieses Kunden
const getKundenStatistik = (req, res) => {
    const kunde = req.params.email;
    const kundenAuftraege = auftraege_1.auftraege.filter((a) => a.erstelltVon === kunde);
    const anzahl = kundenAuftraege.length;
    const gesamtMitarbeiter = kundenAuftraege.reduce((summe, a) => summe + (a.anzahlMitarbeiter || 0), 0);
    res.json({
        kunde,
        anzahl,
        gesamtMitarbeiter,
        durchschnittProAuftrag: anzahl > 0 ? +(gesamtMitarbeiter / anzahl).toFixed(2) : 0,
    });
};
exports.getKundenStatistik = getKundenStatistik;
// (3) Stundenübersicht pro Mitarbeiter
const getStundenProMitarbeiter = (req, res) => {
    const stundenMap = {};
    auftraege_1.auftraege.forEach((auftrag) => {
        const dauer = Number(auftrag.dauer || 0);
        const mitarbeiter = auftrag.eingeteilteMitarbeiter || [];
        mitarbeiter.forEach((m) => {
            if (!stundenMap[m.mitarbeiterId]) {
                stundenMap[m.mitarbeiterId] = 0;
            }
            stundenMap[m.mitarbeiterId] += dauer;
        });
    });
    res.json({ stundenProMitarbeiter: stundenMap });
};
exports.getStundenProMitarbeiter = getStundenProMitarbeiter;
// (4) Auftragsexport als JSON
const exportiereAuftraege = (req, res) => {
    res.setHeader("Content-Disposition", "attachment; filename=auftraege.json");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(auftraege_1.auftraege, null, 2));
};
exports.exportiereAuftraege = exportiereAuftraege;
// Hilfsfunktion: Stunden berechnen
const berechneStunden = (dauer) => {
    const [stunden, minuten] = dauer.split(":").map(Number);
    return stunden + minuten / 60;
};
const getAdminStatistik = (req, res) => {
    let mitarbeiterStunden = {};
    let gesamtdauer = 0;
    let anzahlEinsaetze = 0;
    let gesamtMitarbeiterEinsaetze = 0;
    for (const a of auftraege_1.auftraege) {
        const dauerInStunden = berechneStunden(a.dauer);
        gesamtdauer += dauerInStunden;
        anzahlEinsaetze++;
        if (Array.isArray(a.eingeteilteMitarbeiter)) {
            for (const eintrag of a.eingeteilteMitarbeiter) {
                const id = eintrag.mitarbeiterId;
                mitarbeiterStunden[id] = (mitarbeiterStunden[id] || 0) + dauerInStunden;
            }
            gesamtMitarbeiterEinsaetze += a.eingeteilteMitarbeiter.length;
        }
    }
    const durchschnittDauer = anzahlEinsaetze > 0 ? gesamtdauer / anzahlEinsaetze : 0;
    const durchschnittMitarbeiter = anzahlEinsaetze > 0 ? gesamtMitarbeiterEinsaetze / anzahlEinsaetze : 0;
    res.json({
        mitarbeiterStunden,
        durchschnittDauer: parseFloat(durchschnittDauer.toFixed(2)),
        durchschnittMitarbeiter: parseFloat(durchschnittMitarbeiter.toFixed(2)),
        anzahlEinsaetze,
    });
};
exports.getAdminStatistik = getAdminStatistik;
const mitarbeiter_1 = require("../data/mitarbeiter");
// 🟢 Arbeitsstunden eines Mitarbeiters berechnen
const getMitarbeiterStunden = (req, res) => {
    const { mitarbeiterId } = req.params;
    let stunden = 0;
    auftraege_1.auftraege.forEach((auftrag) => {
        const eintrag = auftrag.eingeteilteMitarbeiter?.find((e) => e.mitarbeiterId === mitarbeiterId && e.status === "bestätigt");
        if (eintrag) {
            stunden += Number(auftrag.dauer || 0);
        }
    });
    res.json({ mitarbeiterId, gesamtstunden: stunden });
};
exports.getMitarbeiterStunden = getMitarbeiterStunden;
// 🟡 Einsätze eines Mitarbeiters (Liste der Aufträge)
const getMitarbeiterEinsaetze = (req, res) => {
    const { mitarbeiterId } = req.params;
    const einsaetze = auftraege_1.auftraege.filter((auftrag) => auftrag.eingeteilteMitarbeiter?.some((e) => e.mitarbeiterId === mitarbeiterId));
    res.json({ mitarbeiterId, einsaetze });
};
exports.getMitarbeiterEinsaetze = getMitarbeiterEinsaetze;
// 🔴 Ampelstatistik eines Mitarbeiters
const getAmpelStatistik = (req, res) => {
    const { mitarbeiterId } = req.params;
    let gruen = 0;
    let gelb = 0;
    let rot = 0;
    auftraege_1.auftraege.forEach((auftrag) => {
        const eintrag = auftrag.bewertungen?.find((b) => b.mitarbeiterId === mitarbeiterId);
        if (eintrag) {
            if (eintrag.ampel === "gruen")
                gruen++;
            else if (eintrag.ampel === "gelb")
                gelb++;
            else if (eintrag.ampel === "rot")
                rot++;
        }
    });
    res.json({ mitarbeiterId, gruen, gelb, rot });
};
exports.getAmpelStatistik = getAmpelStatistik;
// Hilfsfunktion: Gibt alle Aufträge zurück, bei denen der Mitarbeiter bestätigt hat
function berechneStundenProMitarbeiter() {
    const statistik = {};
    mitarbeiter_1.mitarbeiter.forEach((m) => {
        statistik[m.id] = { name: m.name, stunden: 0 };
    });
    for (const auftrag of auftraege_1.auftraege) {
        const dauer = parseFloat(auftrag.dauer || "0");
        auftrag.eingeteilteMitarbeiter?.forEach((slot) => {
            if (slot.status === "bestätigt" && statistik[slot.mitarbeiterId]) {
                statistik[slot.mitarbeiterId].stunden += dauer;
            }
        });
    }
    return statistik;
}
const getMitarbeiterStunden = (req, res) => {
    const daten = berechneStundenProMitarbeiter();
    const liste = Object.entries(daten).map(([id, info]) => ({
        mitarbeiterId: id,
        name: info.name,
        stunden: info.stunden,
    }));
    res.json({ liste });
};
exports.getMitarbeiterStunden = getMitarbeiterStunden;
// ─────────────────────────────────────────────
// Durchschnittswerte: Mitarbeiter / Dauer / Kundenaufträge
const getDurchschnittswerte = (req, res) => {
    let gesamtMitarbeiter = 0;
    let gesamtDauer = 0;
    let auftragAnzahl = auftraege_1.auftraege.length;
    const kundenMap = {};
    for (const auftrag of auftraege_1.auftraege) {
        const anzahl = parseInt(auftrag.anzahlMitarbeiter || "0");
        const dauer = parseFloat(auftrag.dauer || "0");
        gesamtMitarbeiter += anzahl;
        gesamtDauer += dauer;
        const kunde = auftrag.erstelltVon || "unbekannt";
        kundenMap[kunde] = (kundenMap[kunde] || 0) + 1;
    }
    const durchschnittMitarbeiter = auftragAnzahl > 0 ? gesamtMitarbeiter / auftragAnzahl : 0;
    const durchschnittDauer = auftragAnzahl > 0 ? gesamtDauer / auftragAnzahl : 0;
    res.json({
        durchschnittMitarbeiter: durchschnittMitarbeiter.toFixed(1),
        durchschnittDauer: durchschnittDauer.toFixed(1),
        auftraegeProKunde: kundenMap,
    });
};
exports.getDurchschnittswerte = getDurchschnittswerte;
const json2csv_1 = require("json2csv"); // npm install json2csv
// ─────────────────────────────────────────────
// Aufträge als CSV exportieren
const exportiereAuftraegeCSV = (req, res) => {
    try {
        const parser = new json2csv_1.Parser({
            fields: [
                "id",
                "taetigkeit",
                "ort",
                "datum",
                "uhrzeit",
                "dauer",
                "anzahlMitarbeiter",
                "qualifikation",
                "status",
                "erstelltVon",
            ],
        });
        const csv = parser.parse(auftraege_1.auftraege);
        res.header("Content-Type", "text/csv");
        res.attachment("auftraege_export.csv");
        res.send(csv);
    }
    catch (err) {
        res.status(500).json({ message: "Export fehlgeschlagen", fehler: err });
    }
};
exports.exportiereAuftraegeCSV = exportiereAuftraegeCSV;
const krankmeldungen_1 = require("../data/krankmeldungen");
const urlaube_1 = require("../data/urlaube");
const getGesamtStatistik = (_req, res) => {
    const gesamtEinsaetze = auftraege_1.auftraege.length;
    const krankTage = krankmeldungen_1.krankmeldungen.length;
    const urlaubsTage = urlaube_1.urlaube.length;
    const mitarbeiterAnzahl = mitarbeiter_1.mitarbeiter.length;
    res.json({
        mitarbeiterAnzahl,
        gesamtEinsaetze,
        krankTage,
        urlaubsTage,
    });
};
exports.getGesamtStatistik = getGesamtStatistik;
