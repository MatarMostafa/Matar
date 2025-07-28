"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeamleiter = exports.updateTeamleiter = exports.getTeamleiter = void 0;
const express_1 = __importDefault(require("express"));
const teamleiterService_1 = require("../services/teamleiterService");
const router = express_1.default.Router();
// Alle Teamleiter abrufen
router.get("/", exports.getTeamleiter);
// Teamleiter aktualisieren
router.put("/:id", exports.updateTeamleiter);
// Teamleiter löschen
router.delete("/:id", exports.deleteTeamleiter);
exports.default = router;
let teamleiter = [];
const getTeamleiter = (req, res) => {
    res.json(teamleiter);
};
exports.getTeamleiter = getTeamleiter;
const updateTeamleiter = (req, res) => {
    const index = teamleiter.findIndex(t => t.id === req.params.id);
    if (index === -1)
        return res.status(404).json({ error: "Nicht gefunden" });
    teamleiter[index] = { ...teamleiter[index], ...req.body };
    res.json(teamleiter[index]);
};
exports.updateTeamleiter = updateTeamleiter;
const deleteTeamleiter = (req, res) => {
    const index = teamleiter.findIndex(t => t.id === req.params.id);
    if (index === -1)
        return res.status(404).json({ error: "Nicht gefunden" });
    teamleiter.splice(index, 1);
    res.status(204).send();
};
exports.deleteTeamleiter = deleteTeamleiter;
const router = express_1.default.Router();
router.get("/", exports.getTeamleiter);
router.put("/:id", exports.updateTeamleiter);
router.delete("/:id", exports.deleteTeamleiter);
exports.default = router;
const teamleiterController_1 = require("../Controllers/teamleiterController");
const router = express_1.default.Router();
// Aufträge für Teamleiter anzeigen
router.get("/:teamleiterId", teamleiterController_1.getAuftraegeFuerTeamleiter);
// Rückmeldung zu einem Auftrag geben
router.post("/:auftragId/rueckmeldung", teamleiterController_1.rueckmeldungGeben);
// Auftrag freigeben
router.post("/:auftragId/freigeben", teamleiterController_1.auftragFreigeben);
// Auftrag eskalieren
router.post("/:auftragId/eskalieren", teamleiterController_1.auftragEskalieren);
exports.default = router;
const teamleiterController_2 = require("../Controllers/teamleiterController");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const router = express_1.default.Router();
// Alle Aufträge, die einem Teamleiter zugewiesen sind
router.get("/auftraege", authMiddleware_1.authMiddleware, teamleiterController_2.getZugewieseneAuftraege);
// Rückmeldung zu einem Auftrag durch Teamleiter
router.post("/auftraege/:id/rueckmeldung", authMiddleware_1.authMiddleware, teamleiterController_1.rueckmeldungGeben);
exports.default = router;
const teamleiterService_2 = require("../Services/teamleiterService");
const router = express_1.default.Router();
// GET /api/teamleiter
router.get("/", (_req, res) => {
    res.json((0, teamleiterService_2.getAlleTeamleiter)());
});
// POST /api/teamleiter
router.post("/", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name und E-Mail erforderlich" });
    }
    const neuerTL = (0, teamleiterService_2.erstelleTeamleiter)(name, email);
    res.status(201).json(neuerTL);
});
// POST /api/teamleiter/:id/kunde/:kundenId
router.post("/:id/kunde/:kundenId", (req, res) => {
    const teamleiterId = parseInt(req.params.id);
    const kundenId = parseInt(req.params.kundenId);
    const erfolgreich = (0, teamleiterService_2.weiseTeamleiterZuKunde)(teamleiterId, kundenId);
    if (!erfolgreich) {
        return res.status(404).json({ message: "Teamleiter nicht gefunden" });
    }
    res.json({ message: "Zuweisung erfolgreich" });
});
exports.default = router;
