import { Request, Response } from "express";
import { auftraege } from "../data/auftraege";

// (1) Gesamteinsatzstatistik: Anzahl Aufträge, benötigte Mitarbeiter usw.
export const getGesamtStatistik = (req: Request, res: Response) => {
  const anzahlAuftraege = auftraege.length;
  const gesamtMitarbeiter = auftraege.reduce(
    (summe, a) => summe + (a.anzahlMitarbeiter || 0),
    0
  );

  res.json({
    anzahlAuftraege,
    gesamtMitarbeiter,
    durchschnittProAuftrag:
      anzahlAuftraege > 0 ? +(gesamtMitarbeiter / anzahlAuftraege).toFixed(2) : 0,
  });
};

// (2) Kundenbezogene Statistik: Aufträge dieses Kunden
export const getKundenStatistik = (req: Request, res: Response) => {
  const kunde = req.params.email;

  const kundenAuftraege = auftraege.filter((a) => a.erstelltVon === kunde);
  const anzahl = kundenAuftraege.length;
  const gesamtMitarbeiter = kundenAuftraege.reduce(
    (summe, a) => summe + (a.anzahlMitarbeiter || 0),
    0
  );

  res.json({
    kunde,
    anzahl,
    gesamtMitarbeiter,
    durchschnittProAuftrag:
      anzahl > 0 ? +(gesamtMitarbeiter / anzahl).toFixed(2) : 0,
  });
};

// (3) Stundenübersicht pro Mitarbeiter
export const getStundenProMitarbeiter = (req: Request, res: Response) => {
  const stundenMap: Record<string, number> = {};

  auftraege.forEach((auftrag) => {
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

// (4) Auftragsexport als JSON
export const exportiereAuftraege = (req: Request, res: Response) => {
  res.setHeader("Content-Disposition", "attachment; filename=auftraege.json");
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(auftraege, null, 2));
};
import { Request, Response } from "express";
import { auftraege } from "../data/auftraege";

// Hilfsfunktion: Stunden berechnen
const berechneStunden = (dauer: string): number => {
  const [stunden, minuten] = dauer.split(":").map(Number);
  return stunden + minuten / 60;
};

export const getAdminStatistik = (req: Request, res: Response) => {
  let mitarbeiterStunden: { [key: string]: number } = {};
  let gesamtdauer = 0;
  let anzahlEinsaetze = 0;
  let gesamtMitarbeiterEinsaetze = 0;

  for (const a of auftraege) {
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
import type { Request, Response } from "express";
import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";

// 🟢 Arbeitsstunden eines Mitarbeiters berechnen
export const getMitarbeiterStunden = (req: Request, res: Response) => {
  const { mitarbeiterId } = req.params;

  let stunden = 0;

  auftraege.forEach((auftrag) => {
    const eintrag = auftrag.eingeteilteMitarbeiter?.find(
      (e) => e.mitarbeiterId === mitarbeiterId && e.status === "bestätigt"
    );

    if (eintrag) {
      stunden += Number(auftrag.dauer || 0);
    }
  });

  res.json({ mitarbeiterId, gesamtstunden: stunden });
};

// 🟡 Einsätze eines Mitarbeiters (Liste der Aufträge)
export const getMitarbeiterEinsaetze = (req: Request, res: Response) => {
  const { mitarbeiterId } = req.params;

  const einsaetze = auftraege.filter((auftrag) =>
    auftrag.eingeteilteMitarbeiter?.some(
      (e) => e.mitarbeiterId === mitarbeiterId
    )
  );

  res.json({ mitarbeiterId, einsaetze });
};

// 🔴 Ampelstatistik eines Mitarbeiters
export const getAmpelStatistik = (req: Request, res: Response) => {
  const { mitarbeiterId } = req.params;

  let gruen = 0;
  let gelb = 0;
  let rot = 0;

  auftraege.forEach((auftrag) => {
    const eintrag = auftrag.bewertungen?.find(
      (b) => b.mitarbeiterId === mitarbeiterId
    );

    if (eintrag) {
      if (eintrag.ampel === "gruen") gruen++;
      else if (eintrag.ampel === "gelb") gelb++;
      else if (eintrag.ampel === "rot") rot++;
    }
  });

  res.json({ mitarbeiterId, gruen, gelb, rot });
};
// src/Controllers/StatistikController.ts
import type { Request, Response } from "express";
import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";

// Hilfsfunktion: Gibt alle Aufträge zurück, bei denen der Mitarbeiter bestätigt hat
function berechneStundenProMitarbeiter() {
  const statistik: { [key: string]: { name: string; stunden: number } } = {};

  mitarbeiter.forEach((m) => {
    statistik[m.id] = { name: m.name, stunden: 0 };
  });

  for (const auftrag of auftraege) {
    const dauer = parseFloat(auftrag.dauer || "0");

    auftrag.eingeteilteMitarbeiter?.forEach((slot: any) => {
      if (slot.status === "bestätigt" && statistik[slot.mitarbeiterId]) {
        statistik[slot.mitarbeiterId].stunden += dauer;
      }
    });
  }

  return statistik;
}

export const getMitarbeiterStunden = (req: Request, res: Response) => {
  const daten = berechneStundenProMitarbeiter();

  const liste = Object.entries(daten).map(([id, info]) => ({
    mitarbeiterId: id,
    name: info.name,
    stunden: info.stunden,
  }));

  res.json({ liste });
};
// ─────────────────────────────────────────────
// Durchschnittswerte: Mitarbeiter / Dauer / Kundenaufträge
export const getDurchschnittswerte = (req: Request, res: Response) => {
  let gesamtMitarbeiter = 0;
  let gesamtDauer = 0;
  let auftragAnzahl = auftraege.length;
  const kundenMap: { [email: string]: number } = {};

  for (const auftrag of auftraege) {
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

import { Parser } from "json2csv"; // npm install json2csv

// ─────────────────────────────────────────────
// Aufträge als CSV exportieren
export const exportiereAuftraegeCSV = (req: Request, res: Response) => {
  try {
    const parser = new Parser({
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

    const csv = parser.parse(auftraege);

    res.header("Content-Type", "text/csv");
    res.attachment("auftraege_export.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Export fehlgeschlagen", fehler: err });
  }
};
// src/Controllers/statistikController.ts

import { Request, Response } from "express";
import { auftraege } from "../data/auftraege";
import { krankmeldungen } from "../data/krankmeldungen";
import { urlaube } from "../data/urlaube";
import { mitarbeiter } from "../data/mitarbeiter";

export const getGesamtStatistik = (_req: Request, res: Response) => {
  const gesamtEinsaetze = auftraege.length;
  const krankTage = krankmeldungen.length;
  const urlaubsTage = urlaube.length;
  const mitarbeiterAnzahl = mitarbeiter.length;

  res.json({
    mitarbeiterAnzahl,
    gesamtEinsaetze,
    krankTage,
    urlaubsTage,
  });
};