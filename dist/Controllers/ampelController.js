"use strict";
// src/Controllers/ampelController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmpelStatus = void 0;
const mitarbeiter_1 = require("../data/mitarbeiter");
const urlaub_1 = require("../data/urlaub");
const krank_1 = require("../data/krank");
const getAmpelStatus = (req, res) => {
    const heute = new Date();
    const bewertungen = mitarbeiter_1.mitarbeiter.map((m) => {
        const urlaube = urlaub_1.urlaub.filter((u) => u.mitarbeiterId === m.id);
        const krankheiten = krank_1.krankmeldungen.filter((k) => k.mitarbeiterId === m.id);
        const istAktuellAbwesend = [...urlaube, ...krankheiten].some((eintrag) => {
            const von = new Date(eintrag.von);
            const bis = new Date(eintrag.bis);
            return heute >= von && heute <= bis;
        });
        const status = istAktuellAbwesend ? "rot" : "grün";
        return {
            mitarbeiterId: m.id,
            name: m.name,
            status,
        };
    });
    res.json(bewertungen);
};
exports.getAmpelStatus = getAmpelStatus;
