"use strict";
// src/Controllers/krankmeldungController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKrankmeldungen = exports.meldeKrankheit = void 0;
const krankmeldungService_1 = require("../Services/krankmeldungService");
const meldeKrankheit = async (req, res) => {
    try {
        const meldung = await (0, krankmeldungService_1.meldeKrankheitService)(req.body);
        res.status(201).json(meldung);
    }
    catch (error) {
        res.status(500).json({ error: 'Krankmeldung fehlgeschlagen.' });
    }
};
exports.meldeKrankheit = meldeKrankheit;
const getKrankmeldungen = async (_req, res) => {
    try {
        const meldungen = await (0, krankmeldungService_1.getKrankmeldungenService)();
        res.status(200).json(meldungen);
    }
    catch (error) {
        res.status(500).json({ error: 'Fehler beim Abrufen der Krankmeldungen.' });
    }
};
exports.getKrankmeldungen = getKrankmeldungen;
