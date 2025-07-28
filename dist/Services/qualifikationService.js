"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQualifikation = exports.addQualifikation = exports.getAlleQualifikationen = void 0;
const uuid_1 = require("uuid");
let qualifikationen = [];
const getAlleQualifikationen = (req, res) => {
    res.json(qualifikationen);
};
exports.getAlleQualifikationen = getAlleQualifikationen;
const addQualifikation = (req, res) => {
    const neueQualifikation = { id: (0, uuid_1.v4)(), ...req.body };
    qualifikationen.push(neueQualifikation);
    res.status(201).json(neueQualifikation);
};
exports.addQualifikation = addQualifikation;
const deleteQualifikation = (req, res) => {
    const index = qualifikationen.findIndex(q => q.id === req.params.id);
    if (index === -1)
        return res.status(404).json({ error: "Nicht gefunden" });
    qualifikationen.splice(index, 1);
    res.status(204).send();
};
exports.deleteQualifikation = deleteQualifikation;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DATA_PATH = path_1.default.join(__dirname, "..", "data", "qualifikationen.json");
const readData = () => {
    if (!fs_1.default.existsSync(DATA_PATH))
        return [];
    const data = fs_1.default.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(data);
};
const writeData = (data) => {
    fs_1.default.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};
const getAlleQualifikationen = (req, res) => {
    res.json(readData());
};
exports.getAlleQualifikationen = getAlleQualifikationen;
const addQualifikation = (req, res) => {
    const qualis = readData();
    const neueQuali = { id: Date.now().toString(), ...req.body };
    qualis.push(neueQuali);
    writeData(qualis);
    res.status(201).json(neueQuali);
};
exports.addQualifikation = addQualifikation;
const deleteQualifikation = (req, res) => {
    let qualis = readData();
    qualis = qualis.filter((q) => q.id !== req.params.id);
    writeData(qualis);
    res.status(204).send();
};
exports.deleteQualifikation = deleteQualifikation;
