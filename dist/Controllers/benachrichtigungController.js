"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBenachrichtigung = exports.createBenachrichtigung = exports.getBenachrichtigungen = void 0;
const benachrichtigungService_1 = require("../Services/benachrichtigungService");
// Alle Benachrichtigungen abrufen
const getBenachrichtigungen = async (_req, res) => {
    try {
        const benachrichtigungen = await (0, benachrichtigungService_1.getBenachrichtigungen)();
        res.json(benachrichtigungen);
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen der Benachrichtigungen" });
    }
};
exports.getBenachrichtigungen = getBenachrichtigungen;
// Neue Benachrichtigung erstellen
const createBenachrichtigung = async (req, res) => {
    try {
        const neueBenachrichtigung = await (0, benachrichtigungService_1.createBenachrichtigung)(req.body);
        res.status(201).json(neueBenachrichtigung);
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim Erstellen der Benachrichtigung" });
    }
};
exports.createBenachrichtigung = createBenachrichtigung;
// Benachrichtigung löschen
const deleteBenachrichtigung = async (req, res) => {
    try {
        await (0, benachrichtigungService_1.deleteBenachrichtigung)(req.params.id);
        res.json({ message: "Benachrichtigung gelöscht" });
    }
    catch (error) {
        res.status(500).json({ message: "Fehler beim Löschen der Benachrichtigung" });
    }
};
exports.deleteBenachrichtigung = deleteBenachrichtigung;
