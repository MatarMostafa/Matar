export interface Benachrichtigung {
  id: string;               // Eindeutige ID für jede Benachrichtigung
  titel: string;            // Titel der Benachrichtigung
  nachricht: string;        // Nachrichtentext
  empfaengerId: string;     // ID des Empfängers
  erstelltAm: Date;         // Erstellungsdatum
}
