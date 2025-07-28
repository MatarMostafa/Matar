"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.automatischePlanung = automatischePlanung;
// Dummy-Logik für automatische Planung
function automatischePlanung(auftraege, mitarbeiter) {
    console.log("Starte automatische Planung...");
    auftraege.forEach((auftrag, index) => {
        const mitarbeiterIndex = index % mitarbeiter.length;
        const zugewiesenerMitarbeiter = mitarbeiter[mitarbeiterIndex];
        console.log(`Auftrag ${auftrag.id} wird Mitarbeiter ${zugewiesenerMitarbeiter.id} zugewiesen.`);
        // Du kannst hier natürlich die echte Zuweisungslogik einsetzen
    });
    console.log("Automatische Planung abgeschlossen.");
}
