import nodemailer from "nodemailer";

export const sendeEmailService = async (empfaenger: string, betreff: string, nachricht: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
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