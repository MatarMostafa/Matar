"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendeEmail = void 0;
const emailService_1 = require("../Services/emailService");
const sendeEmail = async (req, res) => {
    try {
        const { empfaenger, betreff, nachricht } = req.body;
        if (!empfaenger || !betreff || !nachricht) {
            res.status(400).json({ error: "Alle Felder sind erforderlich." });
            return;
        }
        await (0, emailService_1.sendeEmailService)(empfaenger, betreff, nachricht);
        res.status(200).json({ message: "E-Mail erfolgreich gesendet." });
    }
    catch (error) {
        console.error("Fehler beim E-Mail-Versand:", error);
        res.status(500).json({ error: "Fehler beim Senden der E-Mail." });
    }
};
exports.sendeEmail = sendeEmail;
