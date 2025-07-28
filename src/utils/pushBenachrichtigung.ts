// src/Utils/pushBenachrichtigung.ts

/**
 * Diese Funktion simuliert das Senden einer Push-Benachrichtigung an einen bestimmten Mitarbeiter.
 * Später kann hier Firebase, OneSignal oder ein anderes Push-System eingebaut werden.
 */

export const benachrichtigeMitarbeiter = (mitarbeiterId: number, nachricht: string) => {
  console.log(`📢 Push an Mitarbeiter ${mitarbeiterId}: ${nachricht}`);
};