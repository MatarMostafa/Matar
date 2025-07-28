"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBewertung = exports.updateBewertung = exports.getBewertungById = exports.getBewertungen = exports.createBewertung = void 0;
const createBewertung = async (req, res) => {
    res.status(201).json({ message: 'Bewertung erstellt' });
};
exports.createBewertung = createBewertung;
const getBewertungen = async (req, res) => {
    res.status(200).json({ message: 'Alle Bewertungen' });
};
exports.getBewertungen = getBewertungen;
const getBewertungById = async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Bewertung mit ID ${id}` });
};
exports.getBewertungById = getBewertungById;
const updateBewertung = async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Bewertung ${id} aktualisiert` });
};
exports.updateBewertung = updateBewertung;
const deleteBewertung = async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Bewertung ${id} gelöscht` });
};
exports.deleteBewertung = deleteBewertung;
