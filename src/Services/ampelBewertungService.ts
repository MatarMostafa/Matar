export function bewerteMitarbeiterAmpel(mitarbeiterId: string, bewertung: 'grün' | 'gelb' | 'rot') {
  // Beispiel: Bewertung in Datenbank speichern oder Logik anwenden
  return {
    success: true,
    message: `Mitarbeiter ${mitarbeiterId} wurde mit ${bewertung} bewertet.`,
  };
}