"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.freigebenMitarbeiter = exports.sperreMitarbeiter = void 0;
const sperreMitarbeiter = async (req, res) => {
    const { mitarbeiterId } = req.body;
    // Logik zum Sperren
    res.status(200).json({ message: `Mitarbeiter ${mitarbeiterId} gesperrt` });
};
exports.sperreMitarbeiter = sperreMitarbeiter;
const freigebenMitarbeiter = async (req, res) => {
    const { mitarbeiterId } = req.body;
    // Logik zum Freigeben
    res.status(200).json({ message: `Mitarbeiter ${mitarbeiterId} freigegeben` });
};
exports.freigebenMitarbeiter = freigebenMitarbeiter;
