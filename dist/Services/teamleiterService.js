"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlleTeamleiter = exports.weiseTeamleiterZuKunde = exports.erstelleTeamleiter = exports.deleteTeamleiter = exports.updateTeamleiter = exports.getTeamleiter = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DATA_PATH = path_1.default.join(__dirname, "..", "data", "teamleiter.json");
const readData = () => {
    if (!fs_1.default.existsSync(DATA_PATH))
        return [];
    const data = fs_1.default.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(data);
};
const writeData = (data) => {
    fs_1.default.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};
const getTeamleiter = (req, res) => {
    res.json(readData());
};
exports.getTeamleiter = getTeamleiter;
const updateTeamleiter = (req, res) => {
    let teamleiter = readData();
    const index = teamleiter.findIndex((t) => t.id === req.params.id);
    if (index === -1)
        return res.status(404).json({ message: "Nicht gefunden" });
    teamleiter[index] = { ...teamleiter[index], ...req.body };
    writeData(teamleiter);
    res.json(teamleiter[index]);
};
exports.updateTeamleiter = updateTeamleiter;
const deleteTeamleiter = (req, res) => {
    let teamleiter = readData();
    teamleiter = teamleiter.filter((t) => t.id !== req.params.id);
    writeData(teamleiter);
    res.status(204).send();
};
exports.deleteTeamleiter = deleteTeamleiter;
let teamleiterListe = [];
let teamleiterId = 1;
// Neuen Teamleiter anlegen
const erstelleTeamleiter = (name, email) => {
    const neuerTeamleiter = {
        id: teamleiterId++,
        name,
        email,
        kundenIds: [],
    };
    teamleiterListe.push(neuerTeamleiter);
    return neuerTeamleiter;
};
exports.erstelleTeamleiter = erstelleTeamleiter;
// Teamleiter zu Kunde zuweisen
const weiseTeamleiterZuKunde = (teamleiterId, kundenId) => {
    const teamleiter = teamleiterListe.find((tl) => tl.id === teamleiterId);
    if (!teamleiter)
        return false;
    if (!teamleiter.kundenIds.includes(kundenId)) {
        teamleiter.kundenIds.push(kundenId);
    }
    return true;
};
exports.weiseTeamleiterZuKunde = weiseTeamleiterZuKunde;
// Alle Teamleiter abrufen
const getAlleTeamleiter = () => {
    return teamleiterListe;
};
exports.getAlleTeamleiter = getAlleTeamleiter;
