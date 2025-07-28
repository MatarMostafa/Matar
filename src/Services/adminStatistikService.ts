// src/Services/adminStatistikService.ts

import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";
import { abwesenheiten } from "../data/abwesenheiten";

export const getAdminStatistik = () => {
  const anzahlAuftraege = auftraege.length;
  const anzahlMitarbeiter = mitarbeiter.length;

  const anzahlKrank = abwesenheiten.filter((a) => a.typ === "krank").length;
  const anzahlUrlaub = abwesenheiten.filter((a) => a.typ === "urlaub").length;

  const offeneAuftraege = auftraege.filter((a) => a.status === "offen").length;
  const erledigteAuftraege = auftraege.filter((a) => a.status === "erledigt").length;

  return {
    anzahlAuftraege,
    anzahlMitarbeiter,
    offeneAuftraege,
    erledigteAuftraege,
    krankmeldungen: anzahlKrank,
    urlaubstage: anzahlUrlaub,
  };
};
// src/Services/adminStatistikService.ts

import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";

export const berechneAdminStatistiken = () => {
  const gesamtAuftraege = auftraege.length;
  const erledigt = auftraege.filter(a => a.status === "erledigt").length;
  const offen = auftraege.filter(a => a.status === "offen").length;
  const gesamtMitarbeiter = mitarbeiter.length;

  return {
    gesamtAuftraege,
    erledigteAuftraege: erledigt,
    offeneAuftraege: offen,
    gesamtMitarbeiter
  };
};