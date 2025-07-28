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
exports.deleteAuftrag = exports.updateAuftrag = exports.createAuftrag = exports.getAuftragById = exports.getAllAuftraege = void 0;
const auftragService = __importStar(require("../Services/auftragService"));
const getAllAuftraege = (req, res, next) => {
    try {
        const auftraege = auftragService.getAllAuftraege();
        res.json(auftraege);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllAuftraege = getAllAuftraege;
const getAuftragById = (req, res, next) => {
    try {
        const auftrag = auftragService.getAuftragById(req.params.id);
        if (auftrag) {
            res.json(auftrag);
        }
        else {
            res.status(404).json({ message: 'Auftrag nicht gefunden' });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.getAuftragById = getAuftragById;
const createAuftrag = (req, res, next) => {
    try {
        const newAuftrag = auftragService.createAuftrag(req.body);
        res.status(201).json(newAuftrag);
    }
    catch (err) {
        next(err);
    }
};
exports.createAuftrag = createAuftrag;
const updateAuftrag = (req, res, next) => {
    try {
        const updated = auftragService.updateAuftrag(req.params.id, req.body);
        if (updated) {
            res.json(updated);
        }
        else {
            res.status(404).json({ message: 'Auftrag nicht gefunden' });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.updateAuftrag = updateAuftrag;
const deleteAuftrag = (req, res, next) => {
    try {
        const success = auftragService.deleteAuftrag(req.params.id);
        if (success) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Auftrag nicht gefunden' });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.deleteAuftrag = deleteAuftrag;
