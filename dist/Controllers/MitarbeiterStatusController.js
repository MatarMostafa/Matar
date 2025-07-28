"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlaubBeantragen = exports.krankmelden = exports.beantrageUrlaub = void 0;
const mitarbeiter_1 = require("../data/mitarbeiter");
const auftraege_1 = require("../data/auftraege");
// ─────────────────────────────────────────────
// (1) Urlaub beantragen
const beantrageUrlaub = (req, res) => {
    const mitarbeiterId = req.user.id;
    const { von, bis, kommentar } = req.body;
    const person = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!person)
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    person.urlaube = person.urlaube || [];
    person.urlaube.push({ von, bis, kommentar });
    res.json({ message: "Urlaub beantragt", urlaube: person.urlaube });
};
exports.beantrageUrlaub = beantrageUrlaub;
// ─────────────────────────────────────────────
// (2) Krankmeldung
const krankmelden = (req, res) => {
    const mitarbeiterId = req.user.id;
    const { datum, uhrzeit, kommentar } = req.body;
    const jetzt = new Date();
    const startZeit = new Date(`${datum}T${uhrzeit}`);
    const differenzMinuten = (startZeit.getTime() - jetzt.getTime()) / 60000;
    if (differenzMinuten < 120) {
        return res.status(400).json({ message: "Krankmeldung zu kurzfristig (mind. 2 Stunden vorher)" });
    }
    const person = mitarbeiter_1.mitarbeiter.find((m) => m.id === mitarbeiterId);
    if (!person)
        return res.status(404).json({ message: "Mitarbeiter nicht gefunden" });
    person.krankmeldungen = person.krankmeldungen || [];
    person.krankmeldungen.push({ datum, uhrzeit, kommentar });
    // Auftrag an diesem Tag suchen und ersetzen
    auftraege_1.auftraege.forEach((auftrag) => {
        const geplant = auftrag.eingeteilteMitarbeiter || [];
        const index = geplant.findIndex((e) => e.mitarbeiterId === mitarbeiterId);
        if (index !== -1 && auftrag.datum === datum) {
            geplant.splice(index, 1); // Kranker entfernen
            const ersatz = mitarbeiter_1.mitarbeiter.find((m) => m.id !== mitarbeiterId &&
                m.status === "aktiv" &&
                m.kategorie !== "minijob" // z. B. bevorzugt Vollzeit/Teilzeit
            );
            if (ersatz) {
                geplant.push({ mitarbeiterId: ersatz.id, status: "Ersatz" });
                console.log(`Ersatz eingetragen: ${ersatz.name} für Auftrag ${auftrag.id}`);
            }
        }
    });
    res.json({ message: "Krankmeldung gespeichert & ggf. Ersatz eingetragen" });
};
exports.krankmelden = krankmelden;
const statusListen_1 = require("../data/statusListen");
// Krankmeldung (mindestens 2 Stunden vorher)
const krankmelden = (req, res) => {
    const { mitarbeiterId, grund, datum, uhrzeit } = req.body;
    const jetzt = new Date();
    const meldedatum = new Date(`${datum}T${uhrzeit}`);
    const diffInStunden = (meldedatum.getTime() - jetzt.getTime()) / (1000 * 60 * 60);
    if (diffInStunden < 2) {
        return res.status(400).json({ message: "Krankmeldung muss mindestens 2 Stunden vorher erfolgen." });
    }
    statusListen_1.krankmeldungen.push({
        mitarbeiterId,
        grund,
        datum,
        uhrzeit,
        status: "krank",
    });
    // TODO: Benachrichtigung an Teamleiter & Ersatzmitarbeiter (später)
    return res.status(200).json({ message: "Krankmeldung erfolgreich erfasst." });
};
exports.krankmelden = krankmelden;
// Urlaubsantrag
const urlaubBeantragen = (req, res) => {
    const { mitarbeiterId, von, bis, kommentar } = req.body;
    statusListen_1.urlaubsantraege.push({
        mitarbeiterId,
        von,
        bis,
        kommentar,
        status: "beantragt",
    });
    return res.status(200).json({ message: "Urlaubsantrag erfolgreich eingereicht." });
};
exports.urlaubBeantragen = urlaubBeantragen;
