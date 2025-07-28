"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// src/Utils/mailService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.EMAIL_SERVER,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: `"System" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });
        console.log("📨 E-Mail erfolgreich gesendet an:", to);
    }
    catch (err) {
        console.error("❌ E-Mail konnte nicht gesendet werden:", err);
    }
};
exports.sendEmail = sendEmail;
