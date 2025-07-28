// src/Routes/mitarbeiterAbwesenheitRoutes.ts

import express from "express";
import { urlaubBeantragen, krankmelden } from "../Controllers/MitarbeiterAbwesenheitController";
import { authMiddleware } from "../Utils/authMiddleware";
import { roleMiddleware } from "../Utils/roleMiddleware";

const router = express.Router();

router.use(authMiddleware, roleMiddleware(["mitarbeiter"]));

router.post("/urlaub", urlaubBeantragen);
router.post("/krank", krankmelden);

export default router;