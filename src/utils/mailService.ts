// src/Utils/mailService.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: `"System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log("📨 E-Mail erfolgreich gesendet an:", to);
  } catch (err) {
    console.error("❌ E-Mail konnte nicht gesendet werden:", err);
  }
};