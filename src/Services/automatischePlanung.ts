import { auftraege } from "../data/auftraege";
import { mitarbeiter } from "../data/mitarbeiter";

export const automatischePlanung = () => {
  const heute = new Date().toISOString().split("T")[0];

  for (const auftrag of auftraege) {
    // Nur offene Aufträge mit heutigem Datum und noch keiner Zuteilung
    if (
      auftrag.status === "offen" &&
      auftrag.datum === heute &&
      (!auftrag.eingeteilteMitarbeiter || auftrag.eingeteilteMitarbeiter.length === 0)
    ) {
      const benoetigt = auftrag.anzahlMitarbeiter;

      // Freie Mitarbeiter (nicht bereits eingeplant)
      const freieMitarbeiter = mitarbeiter.filter((m) => {
        const istEingeteilt = auftraege.some((a) =>
          a.eingeteilteMitarbeiter?.some((em) => em.mitarbeiterId === m.id && a.datum === heute)
        );
        return !istEingeteilt;
      });

      // Nach Priorität sortieren
      const priorisiert = [
        ...freieMitarbeiter.filter((m) => m.kategorie === "vollzeit"),
        ...freieMitarbeiter.filter((m) => m.kategorie === "teilzeit"),
        ...freieMitarbeiter.filter((m) => m.kategorie === "minijob"),
      ];

      const zuWeisung = priorisiert.slice(0, benoetigt);

      auftrag.eingeteilteMitarbeiter = zuWeisung.map((m) => ({
        mitarbeiterId: m.id,
        status: "automatisch",
      }));

      auftrag.status = "geplant";
      console.log(`🔄 Auftrag #${auftrag.id} automatisch geplant mit ${zuWeisung.length} Mitarbeiter(n).`);
    }
  }
};