"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loescheMitarbeiter = exports.aktualisiereMitarbeiter = exports.erstelleMitarbeiter = exports.holeMitarbeiterById = exports.holeAlleMitarbeiter = void 0;
const mitarbeiterService = __importStar(require("../Services/mitarbeiterService"));
const holeAlleMitarbeiter = async (req, res) => {
    try {
        const mitarbeiter = await mitarbeiterService.getAll();
        res.json(mitarbeiter);
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Mitarbeiter' });
    }
};
exports.holeAlleMitarbeiter = holeAlleMitarbeiter;
const holeMitarbeiterById = async (req, res) => {
    try {
        const mitarbeiter = await mitarbeiterService.getById?.(req.params.id); // optional chaining
        if (!mitarbeiter) {
            res.status(404).json({ message: 'Mitarbeiter nicht gefunden' });
            return;
        }
        res.json(mitarbeiter);
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen des Mitarbeiters' });
    }
};
exports.holeMitarbeiterById = holeMitarbeiterById;
const erstelleMitarbeiter = async (req, res) => {
    try {
        const neuerMitarbeiter = await mitarbeiterService.create(req.body);
        res.status(201).json(neuerMitarbeiter);
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen des Mitarbeiters' });
    }
};
exports.erstelleMitarbeiter = erstelleMitarbeiter;
const aktualisiereMitarbeiter = async (req, res) => {
    try {
        const aktualisiert = await mitarbeiterService.update(req.params.id, req.body);
        res.json(aktualisiert);
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler beim Aktualisieren des Mitarbeiters' });
    }
};
exports.aktualisiereMitarbeiter = aktualisiereMitarbeiter;
const loescheMitarbeiter = async (req, res) => {
    try {
        await mitarbeiterService.remove(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Fehler beim Löschen des Mitarbeiters' });
    }
};
exports.loescheMitarbeiter = loescheMitarbeiter;
