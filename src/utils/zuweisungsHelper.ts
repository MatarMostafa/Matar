import { mitarbeiterQualifikationen } from "../data/mitarbeiterQualifikationen";
import { auftragQualifikationen } from "../data/auftragQualifikationen";
import { Mitarbeiter } from "../data/mitarbeiter";

export function findeGeeigneteMitarbeiter(
  auftragId: number,
  mitarbeiterListe: Mitarbeiter[]
): Mitarbeiter[] {
  const benoetigteQualis = auftragQualifikationen
    .filter(q => q.auftragId === auftragId)
    .map(q => q.qualifikationId);

  return mitarbeiterListe.filter(m => {
    const mitarbeiterQualis = mitarbeiterQualifikationen
      .filter(mq => mq.mitarbeiterId === m.id)
      .map(mq => mq.qualifikationId);

    // Prüfe, ob alle benötigten Qualis vorhanden sind
    return benoetigteQualis.every(q => mitarbeiterQualis.includes(q));
  });
}