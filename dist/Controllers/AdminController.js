"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArbeitsstunden = exports.bearbeiteQualifikationen = exports.exportiereAuftraegeCsv = exports.getBewertungsUebersicht = exports.sperreAufheben = exports.exportiereAuftraegeCSV = exports.getRotsperrungen = exports.automatischEinplanen = exports.setzeKategorie = exports.getStundenUebersicht = exports.getDurchschnittswerte = exports.getStundenProMitarbeiter = exports.stundenProMitarbeiter = exports.getBewertungen = exports.exportiereAuftraegeAlsCSV = exports.geleisteteStundenProMitarbeiter = exports.einsatzStatistik = exports.kundenStatistik = exports.einsatzzeitProMitarbeiter = exports.gesamteEinsatzzeit = exports.durchschnittlicheMitarbeiteranzahl = exports.auftraegeProKunde = exports.geleisteteStunden = exports.durchschnittlicherEinsatz = exports.gesamtauswertungMonat = exports.kundenMonatsstatistik = exports.durchschnittswerte = exports.einsatzstundenProMitarbeiter = exports.exportiereAuftraege = exports.getDurchschnittMitarbeiter = exports.getKundenStatistik = exports.entsperreMitarbeiter = exports.getSperrungen = void 0;
const mitarbeiter_1 = require("../data/mitarbeiter");
// Alle gesperrten Mitarbeiter je Kunde auflisten
const getSperrungen = (req, res) => {
    const sperrListe = {}; // { kundeEmail: [mitarbeiterName, ...] }
    mitarbeiter_1.mitarbeiter.forEach((m) => {
        m.gesperrtFuer?.forEach((kunde) => {
            if (!sperrListe[kunde])
                sperrListe[kunde] = [];
            sperrListe[kunde].push(m.name);
        });
    });
    res.json({ sperrungen: sperrListe });
};
exports.getSperrungen = getSperrungen;
// Mitarbeiter-Freigabe für bestimmten Kunden
const entsperreMitarbeiter = (req, res) => {
    const { mitarbeiterId, kundeEmail } = req.body;
    const m = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!m)
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    m.gesperrtFuer = (m.gesperrtFuer || []).filter((k) => k !== kundeEmail);
    res.json({ message: "Mitarbeiter wurde freigegeben", mitarbeiter: m });
};
exports.entsperreMitarbeiter = entsperreMitarbeiter;
const auftraege_1 = require("../data/auftraege");
// Statistik pro Kunde
const getKundenStatistik = (req, res) => {
    const kundenMap = {};
    auftraege_1.auftraege.forEach((auftrag) => {
        const kunde = auftrag.erstelltVon || "unbekannt";
        const dauer = parseFloat(auftrag.dauer || "0"); // Stunden
        const einsaetze = auftrag.eingeteilteMitarbeiter?.length || 0;
        const gesamtstunden = einsaetze * dauer;
        if (!kundenMap[kunde]) {
            kundenMap[kunde] = {
                anzahlAuftraege: 0,
                gesamtEinsaetze: 0,
                gesamtStunden: 0,
            };
        }
        kundenMap[kunde].anzahlAuftraege += 1;
        kundenMap[kunde].gesamtEinsaetze += einsaetze;
        kundenMap[kunde].gesamtStunden += gesamtstunden;
    });
    res.json({ statistik: kundenMap });
};
exports.getKundenStatistik = getKundenStatistik;
const dayjs_1 = __importDefault(require("dayjs")); // Stelle sicher, dass dayjs installiert ist
const getDurchschnittMitarbeiter = (req, res) => {
    const wochenStatistik = {};
    const monatsStatistik = {};
    auftraege_1.auftraege.forEach((auftrag) => {
        const datum = (0, dayjs_1.default)(auftrag.datum);
        const anzahl = auftrag.anzahlMitarbeiter || 0;
        const woche = datum.isoWeek() + "-" + datum.year();
        const monat = datum.format("MM-YYYY");
        if (!wochenStatistik[woche]) {
            wochenStatistik[woche] = { total: 0, count: 0 };
        }
        if (!monatsStatistik[monat]) {
            monatsStatistik[monat] = { total: 0, count: 0 };
        }
        wochenStatistik[woche].total += anzahl;
        wochenStatistik[woche].count += 1;
        monatsStatistik[monat].total += anzahl;
        monatsStatistik[monat].count += 1;
    });
    const avgWoche = Object.entries(wochenStatistik).map(([woche, data]) => ({
        woche,
        durchschnitt: data.total / data.count,
    }));
    const avgMonat = Object.entries(monatsStatistik).map(([monat, data]) => ({
        monat,
        durchschnitt: data.total / data.count,
    }));
    res.json({
        durchschnittProWoche: avgWoche,
        durchschnittProMonat: avgMonat,
    });
};
exports.getDurchschnittMitarbeiter = getDurchschnittMitarbeiter;
const exportToCSV_1 = require("../Utils/exportToCSV");
const exportiereAuftraege = (req, res) => {
    const csv = (0, exportToCSV_1.exportAuftraegeAlsCSV)(auftraege_1.auftraege);
    res.setHeader("Content-Disposition", "attachment; filename=auftraege.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
};
exports.exportiereAuftraege = exportiereAuftraege;
const exportiereAuftraege = (req, res) => {
    const csv = (0, exportToCSV_1.exportAuftraegeAlsCSV)(auftraege_1.auftraege);
    res.setHeader("Content-Disposition", "attachment; filename=auftraege.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
};
exports.exportiereAuftraege = exportiereAuftraege;
// Neue Funktion: Einsatzstunden je Mitarbeiter
const einsatzstundenProMitarbeiter = (req, res) => {
    const statistik = {};
    for (const auftrag of auftraege_1.auftraege) {
        const dauerInStunden = parseFloat(auftrag.dauer);
        if (!auftrag.eingeteilteMitarbeiter)
            continue;
        for (const eintrag of auftrag.eingeteilteMitarbeiter) {
            if (eintrag.status === "bestätigt") {
                statistik[eintrag.mitarbeiterId] =
                    (statistik[eintrag.mitarbeiterId] || 0) + dauerInStunden;
            }
        }
    }
    const ergebnis = Object.entries(statistik).map(([id, stunden]) => {
        const mitarbeiterInfo = mitarbeiter_1.mitarbeiter.find(m => m.id === id);
        return {
            id,
            name: mitarbeiterInfo?.name || "Unbekannt",
            stunden: stunden.toFixed(2),
        };
    });
    res.json(ergebnis);
};
exports.einsatzstundenProMitarbeiter = einsatzstundenProMitarbeiter;
const durchschnittswerte = (req, res) => {
    const anzahlAuftraege = auftraege_1.auftraege.length;
    if (anzahlAuftraege === 0) {
        return res.json({
            durchschnittMitarbeiter: 0,
            durchschnittDauer: 0,
        });
    }
    let gesamtMitarbeiter = 0;
    let gesamtDauer = 0;
    for (const auftrag of auftraege_1.auftraege) {
        gesamtDauer += parseFloat(auftrag.dauer || "0");
        if (auftrag.eingeteilteMitarbeiter) {
            gesamtMitarbeiter += auftrag.eingeteilteMitarbeiter.length;
        }
    }
    const durchschnittMitarbeiter = gesamtMitarbeiter / anzahlAuftraege;
    const durchschnittDauer = gesamtDauer / anzahlAuftraege;
    res.json({
        durchschnittMitarbeiter: durchschnittMitarbeiter.toFixed(2),
        durchschnittDauer: durchschnittDauer.toFixed(2),
    });
};
exports.durchschnittswerte = durchschnittswerte;
const date_fns_1 = require("date-fns");
const kundenMonatsstatistik = (req, res) => {
    const statistikMap = {};
    for (const auftrag of auftraege_1.auftraege) {
        const datum = (0, date_fns_1.parseISO)(auftrag.datum);
        if (!(0, date_fns_1.isThisMonth)(datum))
            continue;
        const kunde = auftrag.erstelltVon || "unbekannt";
        const dauer = parseFloat(auftrag.dauer || "0");
        if (!statistikMap[kunde]) {
            statistikMap[kunde] = {
                auftraege: 0,
                gesamtDauer: 0,
                bewertungen: [],
            };
        }
        statistikMap[kunde].auftraege += 1;
        statistikMap[kunde].gesamtDauer += dauer;
        if (Array.isArray(auftrag.bewertungen)) {
            for (const bewertung of auftrag.bewertungen) {
                switch (bewertung.farbe) {
                    case "grün":
                        statistikMap[kunde].bewertungen.push(1);
                        break;
                    case "gelb":
                        statistikMap[kunde].bewertungen.push(0.5);
                        break;
                    case "rot":
                        statistikMap[kunde].bewertungen.push(0);
                        break;
                }
            }
        }
    }
    const result = Object.entries(statistikMap).map(([kunde, daten]) => {
        const bewertungen = daten.bewertungen;
        const durchschnittBewertung = bewertungen.length > 0
            ? (bewertungen.reduce((a, b) => a + b, 0) / bewertungen.length).toFixed(2)
            : "Keine Bewertung";
        return {
            kunde,
            auftraege: daten.auftraege,
            gesamtDauer: daten.gesamtDauer.toFixed(2),
            durchschnittBewertung,
        };
    });
    res.json(result);
};
exports.kundenMonatsstatistik = kundenMonatsstatistik;
const gesamtauswertungMonat = (req, res) => {
    let auftragCount = 0;
    let einsatzCount = 0;
    let gesamtStunden = 0;
    const einsaetzeProMitarbeiter = {};
    const tage = new Set();
    for (const auftrag of auftraege_1.auftraege) {
        const datum = (0, date_fns_1.parseISO)(auftrag.datum);
        if (!(0, date_fns_1.isThisMonth)(datum))
            continue;
        auftragCount++;
        tage.add(auftrag.datum);
        const dauer = parseFloat(auftrag.dauer || "0");
        const eingeteilte = auftrag.eingeteilteMitarbeiter || [];
        gesamtStunden += dauer * eingeteilte.length;
        einsatzCount += eingeteilte.length;
        for (const e of eingeteilte) {
            const id = e.mitarbeiterId;
            einsaetzeProMitarbeiter[id] = (einsaetzeProMitarbeiter[id] || 0) + 1;
        }
    }
    const beliebtester = Object.entries(einsaetzeProMitarbeiter).sort((a, b) => b[1] - a[1])[0];
    res.json({
        auftraege: auftragCount,
        gesamteEinsaetze: einsatzCount,
        gesamtStunden: gesamtStunden.toFixed(2),
        durchschnittProTag: (auftragCount / tage.size).toFixed(2),
        beliebtesterMitarbeiter: beliebtester
            ? { mitarbeiterId: beliebtester[0], anzahl: beliebtester[1] }
            : "Keine Einsätze",
    });
};
exports.gesamtauswertungMonat = gesamtauswertungMonat;
const durchschnittlicherEinsatz = (req, res) => {
    let auftragCount = 0;
    let mitarbeiterSumme = 0;
    for (const auftrag of auftraege_1.auftraege) {
        if (auftrag.eingeteilteMitarbeiter && auftrag.eingeteilteMitarbeiter.length > 0) {
            auftragCount++;
            mitarbeiterSumme += auftrag.eingeteilteMitarbeiter.length;
        }
    }
    const durchschnitt = auftragCount > 0 ? mitarbeiterSumme / auftragCount : 0;
    res.json({
        auftraegeMitEinsatz: auftragCount,
        eingesetzteMitarbeiter: mitarbeiterSumme,
        durchschnittEinsatzProAuftrag: durchschnitt.toFixed(2),
    });
};
exports.durchschnittlicherEinsatz = durchschnittlicherEinsatz;
const geleisteteStunden = (req, res) => {
    const stundenProMitarbeiter = {};
    for (const auftrag of auftraege_1.auftraege) {
        const dauer = parseFloat(auftrag.dauer); // Dauer z. B. "4"
        if (!auftrag.eingeteilteMitarbeiter || isNaN(dauer))
            continue;
        for (const slot of auftrag.eingeteilteMitarbeiter) {
            if (slot.status === "bestätigt") {
                if (!stundenProMitarbeiter[slot.mitarbeiterId]) {
                    stundenProMitarbeiter[slot.mitarbeiterId] = 0;
                }
                stundenProMitarbeiter[slot.mitarbeiterId] += dauer;
            }
        }
    }
    res.json({ stundenProMitarbeiter });
};
exports.geleisteteStunden = geleisteteStunden;
const auftraegeProKunde = (req, res) => {
    const anzahlProKunde = {};
    for (const auftrag of auftraege_1.auftraege) {
        const kunde = auftrag.erstelltVon || "unbekannt";
        if (!anzahlProKunde[kunde]) {
            anzahlProKunde[kunde] = 0;
        }
        anzahlProKunde[kunde]++;
    }
    res.json({ auftraegeProKunde: anzahlProKunde });
};
exports.auftraegeProKunde = auftraegeProKunde;
const durchschnittlicheMitarbeiteranzahl = (req, res) => {
    if (auftraege_1.auftraege.length === 0) {
        return res.json({ durchschnitt: 0 });
    }
    const summe = auftraege_1.auftraege.reduce((acc, auftrag) => {
        return acc + (auftrag.anzahlMitarbeiter || 0);
    }, 0);
    const durchschnitt = summe / auftraege_1.auftraege.length;
    res.json({ durchschnitt: durchschnitt.toFixed(2) });
};
exports.durchschnittlicheMitarbeiteranzahl = durchschnittlicheMitarbeiteranzahl;
const gesamteEinsatzzeit = (req, res) => {
    const jetzt = new Date();
    const aktuellerMonat = jetzt.getMonth();
    const aktuellesJahr = jetzt.getFullYear();
    let gesamtStunden = 0;
    auftraege_1.auftraege.forEach((auftrag) => {
        const auftragsDatum = new Date(auftrag.datum);
        const istImMonat = auftragsDatum.getMonth() === aktuellerMonat &&
            auftragsDatum.getFullYear() === aktuellesJahr;
        if (!istImMonat || !auftrag.eingeteilteMitarbeiter)
            return;
        const bestaetigte = auftrag.eingeteilteMitarbeiter.filter((m) => m.status === "bestätigt");
        gesamtStunden += bestaetigte.length * (auftrag.dauer || 0);
    });
    res.json({ gesamteEinsatzzeitInStunden: gesamtStunden });
};
exports.gesamteEinsatzzeit = gesamteEinsatzzeit;
const einsatzzeitProMitarbeiter = (req, res) => {
    const jetzt = new Date();
    const aktuellerMonat = jetzt.getMonth();
    const aktuellesJahr = jetzt.getFullYear();
    const statistik = {};
    auftraege_1.auftraege.forEach((auftrag) => {
        const auftragsDatum = new Date(auftrag.datum);
        const istImMonat = auftragsDatum.getMonth() === aktuellerMonat &&
            auftragsDatum.getFullYear() === aktuellesJahr;
        if (!istImMonat || !auftrag.eingeteilteMitarbeiter)
            return;
        const dauer = auftrag.dauer || 0;
        auftrag.eingeteilteMitarbeiter.forEach((eintrag) => {
            if (eintrag.status !== "bestätigt")
                return;
            if (!statistik[eintrag.mitarbeiterId]) {
                statistik[eintrag.mitarbeiterId] = 0;
            }
            statistik[eintrag.mitarbeiterId] += dauer;
        });
    });
    res.json({ einsatzzeitProMitarbeiter: statistik });
};
exports.einsatzzeitProMitarbeiter = einsatzzeitProMitarbeiter;
const durchschnittswerte = (req, res) => {
    const jetzt = new Date();
    const aktuellerMonat = jetzt.getMonth();
    const aktuellesJahr = jetzt.getFullYear();
    let summeStunden = 0;
    let summeMitarbeiter = 0;
    let zaehlerAuftraege = 0;
    auftraege_1.auftraege.forEach((auftrag) => {
        const auftragsDatum = new Date(auftrag.datum);
        const istImMonat = auftragsDatum.getMonth() === aktuellerMonat &&
            auftragsDatum.getFullYear() === aktuellesJahr;
        if (!istImMonat || !auftrag.eingeteilteMitarbeiter)
            return;
        const bestaetigte = auftrag.eingeteilteMitarbeiter.filter((m) => m.status === "bestätigt");
        if (bestaetigte.length === 0)
            return;
        zaehlerAuftraege++;
        summeStunden += auftrag.dauer || 0;
        summeMitarbeiter += bestaetigte.length;
    });
    const durchschnittStunden = zaehlerAuftraege > 0 ? summeStunden / zaehlerAuftraege : 0;
    const durchschnittMitarbeiter = zaehlerAuftraege > 0 ? summeMitarbeiter / zaehlerAuftraege : 0;
    res.json({
        durchschnittStundenProAuftrag: durchschnittStunden.toFixed(2),
        durchschnittMitarbeiterProAuftrag: durchschnittMitarbeiter.toFixed(2),
    });
};
exports.durchschnittswerte = durchschnittswerte;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const exportiereAuftraege = (req, res) => {
    const headers = [
        "ID",
        "Tätigkeit",
        "Ort",
        "Datum",
        "Uhrzeit",
        "Dauer",
        "AnzahlMitarbeiter",
        "Qualifikation",
        "Status",
        "ErstelltVon"
    ];
    const rows = auftraege_1.auftraege.map((a) => [
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
    const csvContent = [headers, ...rows]
        .map((row) => row.map((field) => `"${field}"`).join(","))
        .join("\n");
    const dateiname = `auftrag_export_${Date.now()}.csv`;
    const filePath = path_1.default.join("exports", dateiname);
    // Sicherstellen, dass Ordner existiert
    fs_1.default.mkdirSync("exports", { recursive: true });
    fs_1.default.writeFileSync(filePath, csvContent);
    res.download(filePath, dateiname, (err) => {
        if (err) {
            res.status(500).json({ message: "Fehler beim Export" });
        }
        // Datei nach Download optional löschen:
        setTimeout(() => fs_1.default.unlinkSync(filePath), 5000);
    });
};
exports.exportiereAuftraege = exportiereAuftraege;
const kundenStatistik = (req, res) => {
    const statistik = {};
    auftraege_1.auftraege.forEach((auftrag) => {
        const kunde = auftrag.erstelltVon || "unbekannt";
        statistik[kunde] = (statistik[kunde] || 0) + 1;
    });
    // Als sortierbares Array zurückgeben
    const result = Object.entries(statistik)
        .map(([kunde, anzahl]) => ({ kunde, anzahl }))
        .sort((a, b) => b.anzahl - a.anzahl);
    res.json(result);
};
exports.kundenStatistik = kundenStatistik;
const einsatzStatistik = (req, res) => {
    const statistik = {};
    auftraege_1.auftraege.forEach((auftrag) => {
        const datum = new Date(auftrag.datum);
        if (isNaN(datum.getTime()))
            return;
        const monat = `${datum.getFullYear()}-${String(datum.getMonth() + 1).padStart(2, "0")}`;
        const dauer = parseFloat(auftrag.dauer) || 0;
        if (!statistik[monat]) {
            statistik[monat] = { auftraege: 0, stunden: 0 };
        }
        statistik[monat].auftraege += 1;
        statistik[monat].stunden += dauer * (parseInt(auftrag.anzahlMitarbeiter) || 1);
    });
    // In Array umwandeln, damit frontend gut sortieren kann
    const result = Object.entries(statistik)
        .map(([monat, werte]) => ({ monat, ...werte }))
        .sort((a, b) => a.monat.localeCompare(b.monat));
    res.json(result);
};
exports.einsatzStatistik = einsatzStatistik;
const json2csv_1 = require("json2csv");
const exportiereAuftraege = (req, res) => {
    try {
        const felder = [
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
        ];
        const parser = new json2csv_1.Parser({ fields: felder });
        const csv = parser.parse(auftraege_1.auftraege);
        res.header("Content-Type", "text/csv");
        res.attachment("auftraege.csv");
        return res.send(csv);
    }
    catch (err) {
        console.error("CSV Export fehlgeschlagen:", err);
        res.status(500).json({ message: "Export fehlgeschlagen" });
    }
};
exports.exportiereAuftraege = exportiereAuftraege;
const geleisteteStundenProMitarbeiter = (req, res) => {
    const ergebnis = {};
    auftraege_1.auftraege.forEach((auftrag) => {
        const dauer = Number(auftrag.dauer) || 0;
        if (!auftrag.eingeteilteMitarbeiter)
            return;
        auftrag.eingeteilteMitarbeiter.forEach((zugewiesen) => {
            if (zugewiesen.status === "bestätigt") {
                const mid = zugewiesen.mitarbeiterId;
                const mitarbeiterInfo = mitarbeiter_1.mitarbeiter.find((m) => m.id === mid);
                const name = mitarbeiterInfo?.name || mid;
                if (!ergebnis[mid]) {
                    ergebnis[mid] = { name, stunden: 0 };
                }
                ergebnis[mid].stunden += dauer;
            }
        });
    });
    res.json(ergebnis);
};
exports.geleisteteStundenProMitarbeiter = geleisteteStundenProMitarbeiter;
const exportiereAuftraegeAlsCSV = (req, res) => {
    try {
        const fields = [
            "id",
            "taetigkeit",
            "ort",
            "datum",
            "uhrzeit",
            "dauer",
            "anzahlMitarbeiter",
            "qualifikation",
            "erstelltVon",
            "status"
        ];
        const parser = new json2csv_1.Parser({ fields });
        const csv = parser.parse(auftraege_1.auftraege);
        res.header("Content-Type", "text/csv");
        res.attachment("auftraege.csv");
        return res.send(csv);
    }
    catch (err) {
        return res.status(500).json({ message: "CSV-Export fehlgeschlagen", fehler: err });
    }
};
exports.exportiereAuftraegeAlsCSV = exportiereAuftraegeAlsCSV;
// GET /api/admin/bewertungen/:mitarbeiterId
const getBewertungen = (req, res) => {
    const mitarbeiterId = req.params.mitarbeiterId;
    const mitarb = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mitarb) {
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    }
    res.json({
        mitarbeiter: mitarb.name,
        gesperrtFuer: mitarb.gesperrtFuer || [],
        bewertungen: mitarb.bewertungen || [],
    });
};
exports.getBewertungen = getBewertungen;
// ─────────────────────────────
// 1. Bewertungen eines Mitarbeiters abrufen
const getBewertungen = (req, res) => {
    const mitarbeiterId = req.params.mitarbeiterId;
    const mitarb = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mitarb) {
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    }
    res.json({
        mitarbeiter: mitarb.name,
        gesperrtFuer: mitarb.gesperrtFuer || [],
        bewertungen: mitarb.bewertungen || [],
    });
};
exports.getBewertungen = getBewertungen;
// ─────────────────────────────
// 2. Sperre aufheben (nur für Admin)
const entsperreMitarbeiter = (req, res) => {
    const mitarbeiterId = req.params.mitarbeiterId;
    const kundenEmail = req.params.kundenEmail;
    const mitarb = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mitarb || !mitarb.gesperrtFuer) {
        return res.status(404).json({ message: "Nicht gefunden oder keine Sperrung vorhanden" });
    }
    mitarb.gesperrtFuer = mitarb.gesperrtFuer.filter((k) => k !== kundenEmail);
    res.json({ message: `Sperre für ${kundenEmail} aufgehoben` });
};
exports.entsperreMitarbeiter = entsperreMitarbeiter;
// ─────────────────────────────
// 1. Bewertungen eines Mitarbeiters abrufen
const getBewertungen = (req, res) => {
    const mitarbeiterId = req.params.mitarbeiterId;
    const mitarb = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mitarb) {
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    }
    res.json({
        mitarbeiter: mitarb.name,
        gesperrtFuer: mitarb.gesperrtFuer || [],
        bewertungen: mitarb.bewertungen || [],
    });
};
exports.getBewertungen = getBewertungen;
// ─────────────────────────────
// 2. Sperre aufheben (nur für Admin)
const entsperreMitarbeiter = (req, res) => {
    const mitarbeiterId = req.params.mitarbeiterId;
    const kundenEmail = req.params.kundenEmail;
    const mitarb = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mitarb || !mitarb.gesperrtFuer) {
        return res.status(404).json({ message: "Nicht gefunden oder keine Sperrung vorhanden" });
    }
    mitarb.gesperrtFuer = mitarb.gesperrtFuer.filter((k) => k !== kundenEmail);
    res.json({ message: `Sperre für ${kundenEmail} aufgehoben` });
};
exports.entsperreMitarbeiter = entsperreMitarbeiter;
// CSV-Export aller Aufträge → Nur Admin
const exportiereAuftraegeAlsCSV = (_req, res) => {
    try {
        const fields = [
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
        ];
        const parser = new json2csv_1.Parser({ fields });
        const csv = parser.parse(auftraege_1.auftraege);
        res.header("Content-Type", "text/csv");
        res.attachment("auftraege_export.csv");
        return res.send(csv);
    }
    catch (err) {
        return res.status(500).json({ message: "Fehler beim Export", error: err });
    }
};
exports.exportiereAuftraegeAlsCSV = exportiereAuftraegeAlsCSV;
// Alle geleisteten Stunden pro Mitarbeiter (nur bestätigte Aufträge)
const stundenProMitarbeiter = (_req, res) => {
    const ergebnisse = [];
    for (const m of mitarbeiter_1.mitarbeiter) {
        let stunden = 0;
        for (const a of auftraege_1.auftraege) {
            if (!a.eingeteilteMitarbeiter)
                continue;
            for (const e of a.eingeteilteMitarbeiter) {
                if (e.mitarbeiterId === m.id && e.status === "bestätigt") {
                    stunden += parseFloat(a.dauer || "0");
                }
            }
        }
        ergebnisse.push({
            mitarbeiterId: m.id,
            name: m.name,
            stunden,
        });
    }
    res.json(ergebnisse);
};
exports.stundenProMitarbeiter = stundenProMitarbeiter;
// Durchschnittswerte für Admin
const durchschnittswerte = (_req, res) => {
    const alle = auftraege_1.auftraege.length;
    if (alle === 0) {
        return res.json({
            auftraegeGesamt: 0,
            durchschnittlicheDauer: 0,
            durchschnittlicheMitarbeiter: 0,
            bestaetigteEinsaetze: 0
        });
    }
    let summeDauer = 0;
    let summeMitarbeiter = 0;
    let bestaetigteEinsaetze = 0;
    for (const auftrag of auftraege_1.auftraege) {
        summeDauer += parseFloat(auftrag.dauer || "0");
        const mitarbeiterArray = auftrag.eingeteilteMitarbeiter || [];
        summeMitarbeiter += mitarbeiterArray.length;
        bestaetigteEinsaetze += mitarbeiterArray.filter(e => e.status === "bestätigt").length;
    }
    res.json({
        auftraegeGesamt: alle,
        durchschnittlicheDauer: parseFloat((summeDauer / alle).toFixed(2)),
        durchschnittlicheMitarbeiter: parseFloat((summeMitarbeiter / alle).toFixed(2)),
        bestaetigteEinsaetze
    });
};
exports.durchschnittswerte = durchschnittswerte;
// Auftragsexport (z. B. für Buchhaltung)
const exportiereAuftraege = (_req, res) => {
    const data = JSON.stringify(auftraege_1.auftraege, null, 2); // schön formatiert
    const timestamp = new Date().toISOString().split("T")[0]; // z. B. 2025-07-08
    const filename = `auftraege_export_${timestamp}.json`;
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", "application/json");
    res.send(data);
};
exports.exportiereAuftraege = exportiereAuftraege;
// Mitarbeiter-Stundenauswertung
const getStundenProMitarbeiter = (_req, res) => {
    const stundenMap = {}; // mitarbeiterId → Stunden
    for (const auftrag of auftraege_1.auftraege) {
        if (!auftrag.eingeteilteMitarbeiter)
            continue;
        for (const slot of auftrag.eingeteilteMitarbeiter) {
            if (slot.status === "bestätigt") {
                const dauer = Number(auftrag.dauer) || 0;
                if (!stundenMap[slot.mitarbeiterId]) {
                    stundenMap[slot.mitarbeiterId] = 0;
                }
                stundenMap[slot.mitarbeiterId] += dauer;
            }
        }
    }
    const ergebnis = mitarbeiter_1.mitarbeiter.map((m) => ({
        id: m.id,
        name: m.name,
        gesamtstunden: stundenMap[m.id] || 0,
    }));
    res.json({ mitarbeiterStunden: ergebnis });
};
exports.getStundenProMitarbeiter = getStundenProMitarbeiter;
// Durchschnittswerte berechnen
const getDurchschnittswerte = (_req, res) => {
    const totalAuftraege = auftraege_1.auftraege.length;
    if (totalAuftraege === 0) {
        return res.json({
            totalAuftraege: 0,
            durchschnittDauer: 0,
            durchschnittMitarbeiter: 0,
        });
    }
    let summeDauer = 0;
    let summeMitarbeiter = 0;
    for (const auftrag of auftraege_1.auftraege) {
        const dauer = Number(auftrag.dauer) || 0;
        const mitarbeiterAnzahl = auftrag.eingeteilteMitarbeiter?.length || 0;
        summeDauer += dauer;
        summeMitarbeiter += mitarbeiterAnzahl;
    }
    const durchschnittDauer = summeDauer / totalAuftraege;
    const durchschnittMitarbeiter = summeMitarbeiter / totalAuftraege;
    res.json({
        totalAuftraege,
        durchschnittDauer: Math.round(durchschnittDauer * 100) / 100,
        durchschnittMitarbeiter: Math.round(durchschnittMitarbeiter * 100) / 100,
    });
};
exports.getDurchschnittswerte = getDurchschnittswerte;
// CSV-Export aller Aufträge
const exportiereAuftraegeAlsCSV = (_req, res) => {
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
                "erstelltVon"
            ],
        });
        const csv = parser.parse(auftraege_1.auftraege);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=auftraege.csv");
        res.status(200).send(csv);
    }
    catch (error) {
        console.error("CSV Export Fehler:", error);
        res.status(500).json({ message: "Fehler beim Exportieren der CSV-Datei" });
    }
};
exports.exportiereAuftraegeAlsCSV = exportiereAuftraegeAlsCSV;
const AdminController_1 = require("../Controllers/AdminController");
// CSV-Export Route
router.get("/export/csv", authMiddleware, roleMiddleware(["admin"]), exports.exportiereAuftraegeAlsCSV);
// Stundenübersicht pro Mitarbeiter
const getStundenUebersicht = (_req, res) => {
    const uebersicht = {};
    for (const auftrag of auftraege_1.auftraege) {
        const dauer = parseFloat(auftrag.dauer);
        if (isNaN(dauer))
            continue;
        const eingeteilte = auftrag.eingeteilteMitarbeiter || [];
        for (const eintrag of eingeteilte) {
            if (eintrag.status === "bestätigt") {
                const id = eintrag.mitarbeiterId;
                uebersicht[id] = (uebersicht[id] || 0) + dauer;
            }
        }
    }
    res.json({ stundenUebersicht: uebersicht });
};
exports.getStundenUebersicht = getStundenUebersicht;
// Durchschnittswerte: Mitarbeiter & Stunden
const getDurchschnittswerte = (_req, res) => {
    let gesamtMitarbeiter = 0;
    let gesamtStunden = 0;
    let zaehler = 0;
    for (const auftrag of auftraege_1.auftraege) {
        const dauer = parseFloat(auftrag.dauer);
        if (isNaN(dauer))
            continue;
        const eingeteilte = auftrag.eingeteilteMitarbeiter || [];
        const bestaetigt = eingeteilte.filter(e => e.status === "bestätigt");
        if (bestaetigt.length === 0)
            continue;
        gesamtMitarbeiter += bestaetigt.length;
        gesamtStunden += dauer * bestaetigt.length;
        zaehler++;
    }
    const durchschnittMitarbeiter = zaehler ? gesamtMitarbeiter / zaehler : 0;
    const durchschnittStunden = zaehler ? gesamtStunden / zaehler : 0;
    res.json({
        durchschnittMitarbeiter: durchschnittMitarbeiter.toFixed(2),
        durchschnittStunden: durchschnittStunden.toFixed(2),
    });
};
exports.getDurchschnittswerte = getDurchschnittswerte;
// Auftragsexport als CSV oder JSON
const exportiereAuftraege = (req, res) => {
    const format = req.query.format || "json";
    if (format === "csv") {
        try {
            const fields = [
                "id", "taetigkeit", "ort", "datum", "uhrzeit", "dauer",
                "anzahlMitarbeiter", "qualifikation", "status", "erstelltVon"
            ];
            const parser = new json2csv_1.Parser({ fields });
            const csv = parser.parse(auftraege_1.auftraege);
            res.header("Content-Type", "text/csv");
            res.attachment("auftraege.csv");
            return res.send(csv);
        }
        catch (err) {
            return res.status(500).json({ message: "CSV-Export fehlgeschlagen" });
        }
    }
    // JSON-Fallback
    res.header("Content-Type", "application/json");
    res.attachment("auftraege.json");
    res.send(JSON.stringify(auftraege_1.auftraege, null, 2));
};
exports.exportiereAuftraege = exportiereAuftraege;
const geleisteteStundenProMitarbeiter = (req, res) => {
    const stundenMap = {};
    for (const auftrag of auftraege_1.auftraege) {
        if (!auftrag.eingeteilteMitarbeiter || !auftrag.dauer)
            continue;
        const dauerInStunden = parseFloat(auftrag.dauer);
        for (const slot of auftrag.eingeteilteMitarbeiter) {
            if (slot.status === "bestätigt") {
                stundenMap[slot.mitarbeiterId] = (stundenMap[slot.mitarbeiterId] || 0) + dauerInStunden;
            }
        }
    }
    const ergebnis = Object.entries(stundenMap).map(([id, stunden]) => {
        const mitarbeiterName = mitarbeiter_1.mitarbeiter.find(m => m.id === id)?.name || "Unbekannt";
        return {
            mitarbeiterId: id,
            name: mitarbeiterName,
            stunden: stunden
        };
    });
    res.json(ergebnis);
};
exports.geleisteteStundenProMitarbeiter = geleisteteStundenProMitarbeiter;
// Mitarbeiter-Kategorie ändern
const setzeKategorie = (req, res) => {
    const { id } = req.params;
    const { kategorie } = req.body;
    if (!["vollzeit", "teilzeit", "minijob"].includes(kategorie)) {
        return res.status(400).json({ message: "Ungültige Kategorie" });
    }
    const mitarbeiterEintrag = mitarbeiter_1.mitarbeiter.find(m => m.id === id);
    if (!mitarbeiterEintrag) {
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    }
    mitarbeiterEintrag.kategorie = kategorie;
    res.json({ message: "Kategorie aktualisiert", mitarbeiter: mitarbeiterEintrag });
};
exports.setzeKategorie = setzeKategorie;
// Automatische Zuweisung von Mitarbeitern
const automatischEinplanen = (req, res) => {
    const offeneAuftraege = auftraege_1.auftraege.filter(a => a.status === "offen" && !a.eingeteilteMitarbeiter);
    const log = [];
    for (const auftrag of offeneAuftraege) {
        const benoetigt = auftrag.anzahlMitarbeiter || 1;
        const erforderlich = auftrag.qualifikation;
        // Verfügbare & aktive Mitarbeiter
        let verfuegbar = mitarbeiter_1.mitarbeiter.filter(m => m.aktiv);
        // Nach Kategorie priorisieren
        const prioritaet = { vollzeit: 1, teilzeit: 2, minijob: 3 };
        verfuegbar.sort((a, b) => (prioritaet[a.kategorie] || 4) - (prioritaet[b.kategorie] || 4));
        // Optional: nach Qualifikation filtern
        if (erforderlich) {
            verfuegbar = verfuegbar.filter(m => m.qualifikationen?.includes(erforderlich));
        }
        const zugewiesen = verfuegbar.slice(0, benoetigt);
        if (zugewiesen.length > 0) {
            auftrag.eingeteilteMitarbeiter = zugewiesen.map(m => ({
                mitarbeiterId: m.id,
                status: "offen",
            }));
            auftrag.status = "geplant";
            log.push(`Auftrag ${auftrag.id}: ${zugewiesen.length} Mitarbeiter automatisch zugewiesen.`);
        }
        else {
            log.push(`Auftrag ${auftrag.id}: Keine passenden Mitarbeiter gefunden.`);
        }
    }
    res.json({ message: "Automatische Einplanung abgeschlossen", log });
};
exports.automatischEinplanen = automatischEinplanen;
// Durchschnittswerte für Admin
const getDurchschnittswerte = (req, res) => {
    const alleAuftraege = auftraege_1.auftraege;
    if (alleAuftraege.length === 0) {
        return res.status(200).json({
            durchschnittMitarbeiter: 0,
            durchschnittStunden: 0,
        });
    }
    let summeMitarbeiter = 0;
    let summeStunden = 0;
    for (const a of alleAuftraege) {
        summeMitarbeiter += a.anzahlMitarbeiter || 0;
        summeStunden += parseFloat(a.dauer || "0");
    }
    const durchschnittMitarbeiter = +(summeMitarbeiter / alleAuftraege.length).toFixed(2);
    const durchschnittStunden = +(summeStunden / alleAuftraege.length).toFixed(2);
    res.json({
        durchschnittMitarbeiter,
        durchschnittStunden,
    });
};
exports.getDurchschnittswerte = getDurchschnittswerte;
// Stundenübersicht pro Mitarbeiter
const getStundenProMitarbeiter = (req, res) => {
    const stundenMap = {};
    for (const a of auftraege_1.auftraege) {
        if (!a.eingeteilteMitarbeiter || !a.dauer)
            continue;
        for (const e of a.eingeteilteMitarbeiter) {
            if (e.status !== "bestätigt")
                continue;
            const mitarbeiterId = e.mitarbeiterId;
            const dauer = parseFloat(a.dauer);
            if (!stundenMap[mitarbeiterId]) {
                const mitarbeiterInfo = mitarbeiter_1.mitarbeiter.find(m => m.id === mitarbeiterId);
                const name = mitarbeiterInfo ? mitarbeiterInfo.name : "Unbekannt";
                stundenMap[mitarbeiterId] = {
                    name,
                    anzahlAuftraege: 0,
                    gesamtStunden: 0,
                };
            }
            stundenMap[mitarbeiterId].anzahlAuftraege += 1;
            stundenMap[mitarbeiterId].gesamtStunden += dauer;
        }
    }
    // Formatieren
    const ergebnis = Object.entries(stundenMap).map(([id, daten]) => ({
        mitarbeiterId: id,
        ...daten,
        gesamtStunden: +daten.gesamtStunden.toFixed(2),
    }));
    res.json(ergebnis);
};
exports.getStundenProMitarbeiter = getStundenProMitarbeiter;
// Übersicht aller "Rot"-Sperrungen
const getRotsperrungen = (req, res) => {
    const rotBewertungen = mitarbeiter_1.mitarbeiter
        .filter(m => m.sperrungen && m.sperrungen.length > 0)
        .flatMap(m => m.sperrungen
        .filter(s => s.art === "rot")
        .map(s => ({
        mitarbeiterId: m.id,
        mitarbeiterName: m.name,
        kunde: s.kunde,
        kommentar: s.kommentar,
        datum: s.datum,
    })));
    res.json(rotBewertungen);
};
exports.getRotsperrungen = getRotsperrungen;
const csv_writer_1 = require("csv-writer");
// CSV-Export aller Aufträge
const exportiereAuftraegeCSV = async (req, res) => {
    try {
        const filePath = path_1.default.join(__dirname, "../../exports/auftraege.csv");
        const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
            path: filePath,
            header: [
                { id: "id", title: "ID" },
                { id: "taetigkeit", title: "Tätigkeit" },
                { id: "ort", title: "Ort" },
                { id: "datum", title: "Datum" },
                { id: "uhrzeit", title: "Uhrzeit" },
                { id: "dauer", title: "Dauer" },
                { id: "anzahlMitarbeiter", title: "Mitarbeiteranzahl" },
                { id: "qualifikation", title: "Qualifikation" },
                { id: "erstelltVon", title: "Erstellt von" },
                { id: "status", title: "Status" },
            ],
        });
        await csvWriter.writeRecords(auftraege_1.auftraege);
        // Datei zurücksenden
        res.download(filePath, "auftraege.csv");
    }
    catch (err) {
        console.error("Fehler beim Exportieren:", err);
        res.status(500).json({ message: "Fehler beim Exportieren der CSV-Datei" });
    }
};
exports.exportiereAuftraegeCSV = exportiereAuftraegeCSV;
// Übersicht: Stunden pro Mitarbeiter
const stundenProMitarbeiter = (req, res) => {
    const stunden = {};
    for (const auftrag of auftraege_1.auftraege) {
        if (!auftrag.eingeteilteMitarbeiter)
            continue;
        for (const eintrag of auftrag.eingeteilteMitarbeiter) {
            if (eintrag.status === "bestätigt") {
                const id = eintrag.mitarbeiterId;
                const dauer = parseFloat(auftrag.dauer) || 0;
                if (!stunden[id])
                    stunden[id] = 0;
                stunden[id] += dauer;
            }
        }
    }
    const ergebnis = Object.entries(stunden).map(([id, stunden]) => {
        const mitarbeiterInfo = mitarbeiter_1.mitarbeiter.find(m => m.id === id);
        return {
            mitarbeiterId: id,
            name: mitarbeiterInfo?.name || "Unbekannt",
            stunden,
        };
    });
    res.json(ergebnis);
};
exports.stundenProMitarbeiter = stundenProMitarbeiter;
const sperrListe_1 = require("../Utils/sperrListe");
// Admin hebt die Sperrung für einen Mitarbeiter bei einem Kunden auf
const sperreAufheben = (req, res) => {
    const { mitarbeiterId, kundeId } = req.body;
    if (!mitarbeiterId || !kundeId) {
        return res.status(400).json({ message: "MitarbeiterId und KundeId erforderlich" });
    }
    const mit = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mit) {
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    }
    if (!mit.sperrungen || !mit.sperrungen.includes(kundeId)) {
        return res.status(400).json({ message: "Keine Sperrung für diesen Kunden vorhanden" });
    }
    (0, sperrListe_1.sperrungAufheben)(mitarbeiterId, kundeId);
    res.json({ message: "Sperrung erfolgreich aufgehoben" });
};
exports.sperreAufheben = sperreAufheben;
// Hilfsfunktion zur Ermittlung des Bewertungs-Scores
function farbeZuPunkt(farbe) {
    if (farbe === "grün")
        return 3;
    if (farbe === "gelb")
        return 2;
    if (farbe === "rot")
        return 1;
    return 0;
}
// ─────────────────────────────
// Admin sieht Übersicht aller Mitarbeiter-Bewertungen
const getBewertungsUebersicht = (req, res) => {
    const daten = mitarbeiter_1.mitarbeiter.map((m) => {
        const bewertungen = m.bewertungen || [];
        const gesamt = bewertungen.length;
        const gruen = bewertungen.filter((b) => b.farbe === "grün").length;
        const gelb = bewertungen.filter((b) => b.farbe === "gelb").length;
        const rot = bewertungen.filter((b) => b.farbe === "rot").length;
        const durchschnitt = gesamt > 0
            ? (bewertungen.reduce((sum, b) => sum + farbeZuPunkt(b.farbe), 0) / gesamt).toFixed(2)
            : "—";
        return {
            id: m.id,
            name: m.name,
            gesamt,
            gruen,
            gelb,
            rot,
            durchschnitt,
        };
    });
    res.json(daten);
};
exports.getBewertungsUebersicht = getBewertungsUebersicht;
const exportCsv_1 = require("../Utils/exportCsv");
const fs_2 = require("fs");
// ─────────────────────────────
// Exportiere Aufträge als CSV
const exportiereAuftraegeCsv = (req, res) => {
    const daten = auftraege_1.auftraege.map((a) => ({
        id: a.id,
        taetigkeit: a.taetigkeit,
        ort: a.ort,
        datum: a.datum,
        uhrzeit: a.uhrzeit,
        dauer: a.dauer,
        mitarbeiter: a.anzahlMitarbeiter,
        qualifikation: a.qualifikation,
        status: a.status,
        erstelltVon: a.erstelltVon,
    }));
    const csv = (0, exportCsv_1.jsonToCsv)(daten);
    const dateiname = `auftraege_${Date.now()}.csv`;
    const pfad = path_1.default.join(__dirname, "../../exports", dateiname);
    (0, fs_2.writeFileSync)(pfad, csv, "utf-8");
    res.download(pfad, dateiname);
};
exports.exportiereAuftraegeCsv = exportiereAuftraegeCsv;
// Qualifikationen aktualisieren
const bearbeiteQualifikationen = (req, res) => {
    const mitarbeiterId = req.params.id;
    const { qualifikationen } = req.body;
    const mitarb = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!mitarb) {
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    }
    mitarb.qualifikationen = qualifikationen;
    res.json({ message: "Qualifikationen aktualisiert", mitarbeiter: mitarb });
};
exports.bearbeiteQualifikationen = bearbeiteQualifikationen;
// Gesamte Arbeitsstunden pro Mitarbeiter
const getArbeitsstunden = (req, res) => {
    const result = {};
    mitarbeiter_1.mitarbeiter.forEach(m => {
        result[m.id] = {
            name: m.name,
            stunden: 0
        };
    });
    for (const auftrag of auftraege_1.auftraege) {
        if (!auftrag.eingeteilteMitarbeiter)
            continue;
        for (const einsatz of auftrag.eingeteilteMitarbeiter) {
            if (einsatz.status === "bestätigt") {
                const dauer = Number(auftrag.dauer) || 0;
                if (result[einsatz.mitarbeiterId]) {
                    result[einsatz.mitarbeiterId].stunden += dauer;
                }
            }
        }
    }
    res.json({ mitarbeiterStunden: result });
};
exports.getArbeitsstunden = getArbeitsstunden;
