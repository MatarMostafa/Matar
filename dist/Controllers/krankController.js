"use strict";
// src/Controllers/krankController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlleKrankmeldungen = exports.lehneKrankmeldungAb = exports.genehmigeKrankmeldung = exports.reicheKrankmeldungEin = void 0;
const uuid_1 = require("uuid");
const krankmeldungen = [];
// Krankmeldung einreichen
const reicheKrankmeldungEin = (req, res) => {
    const { mitarbeiterId, von, bis, grund } = req.body;
    if (!mitarbeiterId || !von || !bis || !grund) {
        return res.status(400).json({ message: "Alle Felder sind erforderlich." });
    }
    const neueMeldung = {
        id: (0, uuid_1.v4)(),
        mitarbeiterId,
        von,
        bis,
        grund,
        status: "offen",
    };
    krankmeldungen.push(neueMeldung);
    return res.status(201).json({
        message: "Krankmeldung eingereicht",
        meldung: neueMeldung,
    });
};
exports.reicheKrankmeldungEin = reicheKrankmeldungEin;
// Genehmigen
const genehmigeKrankmeldung = (req, res) => {
    const { id } = req.params;
    const meldung = krankmeldungen.find((m) => m.id === id);
    if (!meldung) {
        return res.status(404).json({ message: "Krankmeldung nicht gefunden." });
    }
    meldung.status = "akzeptiert";
    return res.status(200).json({ message: "Krankmeldung akzeptiert", meldung });
};
exports.genehmigeKrankmeldung = genehmigeKrankmeldung;
// Ablehnen
const lehneKrankmeldungAb = (req, res) => {
    const { id } = req.params;
    const meldung = krankmeldungen.find((m) => m.id === id);
    if (!meldung) {
        return res.status(404).json({ message: "Krankmeldung nicht gefunden." });
    }
    meldung.status = "abgelehnt";
    return res.status(200).json({ message: "Krankmeldung abgelehnt", meldung });
};
exports.lehneKrankmeldungAb = lehneKrankmeldungAb;
// Alle anzeigen
const getAlleKrankmeldungen = (_req, res) => {
    res.status(200).json({ meldungen: krankmeldungen });
};
exports.getAlleKrankmeldungen = getAlleKrankmeldungen;
