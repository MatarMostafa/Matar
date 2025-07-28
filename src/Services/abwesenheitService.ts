import { sendNotificationToUser } from "../Services/benachrichtigungService";
import { mitarbeiterListe } from "../data/mitarbeiter";
import { Abwesenheitseintrag } from "../types/abwesenheit";

export const meldenAbwesenheit = (eintrag: Abwesenheitseintrag) => {
  const mitarbeiterInfo = mitarbeiterListe.find((m: any) => m.id === eintrag.mitarbeiterId);

  if (!mitarbeiterInfo) return;

  const titel = "Abwesenheit erfasst";
  const nachricht = `${mitarbeiterInfo.vorname} ${mitarbeiterInfo.nachname} ist am ${eintrag.datum} abwesend (${eintrag.typ}).`;

  sendNotificationToUser(mitarbeiterInfo.id, titel, nachricht);
};