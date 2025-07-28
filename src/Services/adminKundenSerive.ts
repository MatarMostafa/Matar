// src/Services/adminKundenService.ts

interface Kunde {
  id: number;
  hauptEmail: string;
  unteraccounts: Unteraccount[];
}

interface Unteraccount {
  id: number;
  email: string;
  passwort: string;
}

let kunden: Kunde[] = [
  {
    id: 1,
    hauptEmail: "firma@example.com",
    unteraccounts: [
      { id: 1, email: "mitarbeiter1@firma.com", passwort: "passwort123" },
    ],
  },
];

// Alle Kunden abrufen
export const getAlleKunden = (): Kunde[] => {
  return kunden;
};

// Neuen Kunden hinzufügen
export const addKunde = (hauptEmail: string): Kunde => {
  const neuerKunde: Kunde = {
    id: kunden.length + 1,
    hauptEmail,
    unteraccounts: [],
  };
  kunden.push(neuerKunde);
  return neuerKunde;
};

// Unteraccount zu Kunde hinzufügen
export const addUnteraccount = (
  kundeId: number,
  email: string,
  passwort: string
): Unteraccount | null => {
  const kunde = kunden.find(k => k.id === kundeId);
  if (!kunde) return null;

  const neuerAccount: Unteraccount = {
    id: Date.now(), // einfache ID-Generierung
    email,
    passwort,
  };

  kunde.unteraccounts.push(neuerAccount);
  return neuerAccount;
};

// Unteraccount löschen
export const deleteUnteraccount = (kundeId: number, unteraccountId: number): boolean => {
  const kunde = kunden.find(k => k.id === kundeId);
  if (!kunde) return false;

  const index = kunde.unteraccounts.findIndex(ua => ua.id === unteraccountId);
  if (index === -1) return false;

  kunde.unteraccounts.splice(index, 1);
  return true;
};