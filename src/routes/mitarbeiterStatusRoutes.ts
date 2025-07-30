// src/Routes/mitarbeiterStatusRoutes.ts
import express from "express";
import {
  beantrageUrlaub,
  krankmelden,
} from "../Controllers/MitarbeiterStatusController";
import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";

const router = express.Router();

router.post(
  "/urlaub",
  authMiddleware,
  roleMiddleware(["mitarbeiter"]),
  beantrageUrlaub
);

router.post(
  "/krankmelden",
  authMiddleware,
  roleMiddleware(["mitarbeiter"]),
  krankmelden
);

export default router;
// src/Routes/mitarbeiterStatusRoutes.ts

import express from "express";
import { krankmelden, urlaubBeantragen } from "../Controllers/mitarbeiterStatusController";

const router = express.Router();

// Routen für Krankmeldung & Urlaub
router.post("/krankmelden", krankmelden);
router.post("/urlaub", urlaubBeantragen);

export default router;