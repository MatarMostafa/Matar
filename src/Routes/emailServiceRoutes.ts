import express from "express";
import { sendeEmail } from "../Controllers/emailServiceController";

const router = express.Router();

router.post("/senden", sendeEmail);

export default router;