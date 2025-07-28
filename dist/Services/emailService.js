"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendeEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendeEmailService = async (empfaenger, betreff, nachricht) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: empfaenger,
        subject: betreff,
        text: nachricht,
    });
};
exports.sendeEmailService = sendeEmailService;
