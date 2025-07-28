"use strict";
// src/cron/dailyScheduler.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const autoPlanung_1 = require("../services/autoPlanung");
// Jeden Tag um 00:00 Uhr
node_cron_1.default.schedule("0 0 * * *", () => {
    console.log("⏰ Cronjob gestartet: Tägliche Einsatzplanung");
    (0, autoPlanung_1.automatischeEinsatzplanung)();
});
