import express from "express";
import { meldenAbwesenheit } from "../Services/abwesenheitService";
import { Abwesenheitseintrag } from "../types/abwesenheit";

const router = express.Router();

router.post("/abwesenheit", (req, res) => {
  const eintrag: Abwesenheitseintrag = req.body;
  meldenAbwesenheit(eintrag);
  res.status(200).json({ message: "Abwesenheit erfasst und Benachrichtigung gesendet." });
});

export default router;