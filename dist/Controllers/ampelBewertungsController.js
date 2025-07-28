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
exports.deleteBewertung = exports.createBewertung = exports.getBewertungenByMitarbeiter = exports.getAllBewertungen = void 0;
const ampelService = __importStar(require("../Services/ampelBewertungsService"));
const getAllBewertungen = (req, res) => {
    const result = ampelService.getAllBewertungen();
    res.json(result);
};
exports.getAllBewertungen = getAllBewertungen;
const getBewertungenByMitarbeiter = (req, res) => {
    const mitarbeiterId = req.params.mitarbeiterId;
    const result = ampelService.getBewertungenByMitarbeiter(mitarbeiterId);
    res.json(result);
};
exports.getBewertungenByMitarbeiter = getBewertungenByMitarbeiter;
const createBewertung = (req, res) => {
    const newBewertung = ampelService.createBewertung(req.body);
    res.status(201).json(newBewertung);
};
exports.createBewertung = createBewertung;
const deleteBewertung = (req, res) => {
    const id = req.params.id;
    const deleted = ampelService.deleteBewertung(id);
    if (deleted) {
        res.json({ message: 'Bewertung gelöscht' });
    }
    else {
        res.status(404).json({ message: 'Nicht gefunden' });
    }
};
exports.deleteBewertung = deleteBewertung;
