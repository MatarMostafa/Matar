"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exportToCsvService_1 = require("../Services/exportToCsvService");
const router = express_1.default.Router();
// GET /api/export/csv
router.get("/", async (req, res) => {
    try {
        const csvBuffer = await (0, exportToCsvService_1.exportDataToCsv)();
        res.setHeader("Content-Disposition", "attachment; filename=export.csv");
        res.setHeader("Content-Type", "text/csv");
        res.send(csvBuffer);
    }
    catch (error) {
        res.status(500).json({ message: "Export fehlgeschlagen", error: error.message });
    }
});
exports.default = router;
