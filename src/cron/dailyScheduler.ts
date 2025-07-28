// src/cron/dailyScheduler.ts

import cron from "node-cron";
import { automatischeEinsatzplanung } from "../services/autoPlanung";

// Jeden Tag um 00:00 Uhr
cron.schedule("0 0 * * *", () => {
  console.log("⏰ Cronjob gestartet: Tägliche Einsatzplanung");
  automatischeEinsatzplanung();
});