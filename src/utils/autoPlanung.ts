import { Auftrag } from '../types/auftrag';
import { Mitarbeiter } from '../types/mitarbeiter';

// Dummy-Logik für automatische Planung
export function automatischePlanung(auftraege: Auftrag[], mitarbeiter: Mitarbeiter[]): void {
  console.log("Starte automatische Planung...");

  auftraege.forEach((auftrag, index) => {
    const mitarbeiterIndex = index % mitarbeiter.length;
    const zugewiesenerMitarbeiter = mitarbeiter[mitarbeiterIndex];

    console.log(`Auftrag ${auftrag.id} wird Mitarbeiter ${zugewiesenerMitarbeiter.id} zugewiesen.`);
    // Du kannst hier natürlich die echte Zuweisungslogik einsetzen
  });

  console.log("Automatische Planung abgeschlossen.");
}