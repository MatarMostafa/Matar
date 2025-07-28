export async function getAdminUserStatistik(): Promise<any> {
  try {
    // Dummy-Daten oder später echte Datenbankabfrage
    return {
      gesamtMitarbeiter: 48,
      aktiveMitarbeiter: 42,
      gesperrteMitarbeiter: 6,
      aktuelleAuftraege: 25,
      beendeteAuftraege: 129,
    };
  } catch (error) {
    console.error('Fehler in getAdminUserStatistik:', error);
    throw error;
  }
}