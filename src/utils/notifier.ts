// src/Utils/notifier.ts

export type Role = "admin" | "teamleiter" | "mitarbeiter" | "kunde";

export const sendNotification = (
  toRole: Role | Role[],
  message: string
): void => {
  const rollen = Array.isArray(toRole) ? toRole : [toRole];
  rollen.forEach((rolle) => {
    console.log(`📢 Nachricht an [${rolle.toUpperCase()}]: ${message}`);
  });
};