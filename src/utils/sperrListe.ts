// src/Utils/sperrListe.ts
import { mitarbeiter } from "../data/mitarbeiter";

export const mitarbeiterSperren = (mitarbeiterId: string, kundeId: string) => {
  const mit = mitarbeiter.find((m) => m.id === mitarbeiterId);
  if (!mit) return;

  mit.sperrungen = mit.sperrungen || [];
  if (!mit.sperrungen.includes(kundeId)) {
    mit.sperrungen.push(kundeId);
    console.log(`⚠️  Mitarbeiter ${mitarbeiterId} für Kunde ${kundeId} gesperrt`);
  }
};

export const sperrungAufheben = (mitarbeiterId: string, kundeId: string) => {
  const mit = mitarbeiter.find((m) => m.id === mitarbeiterId);
  if (!mit || !mit.sperrungen) return;

  mit.sperrungen = mit.sperrungen.filter((id) => id !== kundeId);
  console.log(`🔓 Sperrung aufgehoben für MA ${mitarbeiterId} bei Kunde ${kundeId}`);
};