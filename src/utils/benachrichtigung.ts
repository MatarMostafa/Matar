// src/Utils/benachrichtigung.ts

export function sendeBenachrichtigung(empfaenger: string, text: string) {
  // Hier später Push-Benachrichtigung integrieren
  console.log(`🔔 Nachricht an ${empfaenger}: ${text}`);
}
// src/Utils/benachrichtigung.ts

export const sendeBenachrichtigung = (empfaenger: string, nachricht: string) => {
  console.log(`📨 Nachricht an ${empfaenger}: ${nachricht}`);
};