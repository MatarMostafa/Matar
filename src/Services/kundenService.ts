// src/Services/kundenService.ts

export interface Kunde {
  id: number;
  firmenname: string;
  email: string;
  unteraccounts: Unteraccount[];
}

export interface Unteraccount {
  id: number;
  name: string;
  email: string;
}

let kunden: Kunde[] = [];
let kundeId = 1;
let unteraccountId = 1;

// Kunden erstellen
export const erstelleKunde = (firmenname: string, email: string): Kunde => {
  const neuerKunde: Kunde = {
    id: kundeId++,
    firmenname,
    email,
    unteraccounts: [],
  };
  kunden.push(neuerKunde);
  return neuerKunde;
};

// Alle Kunden abrufen
export const getAlleKunden = (): Kunde[] => {
  return kunden;
};

// Unteraccount hinzufügen
export const fuegeUnteraccountHinzu = (kundeId: number, name: string, email: string): Unteraccount | null => {
  const kunde = kunden.find((k) => k.id === kundeId);
  if (!kunde) return null;

  const neuerUnteraccount: Unteraccount = {
    id: unteraccountId++,
    name,
    email,
  };
  kunde.unteraccounts.push(neuerUnteraccount);
  return neuerUnteraccount;
};
// src/Services/kundenService.ts

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
      { id: 2, email: "mitarbeiter2@firma.com", passwort: "passwort456" },
    ],
  },
];

export const findeUnteraccount = (email: string, passwort: string) => {
  for (const kunde of kunden) {
    const account = kunde.unteraccounts.find(
      (ua) => ua.email === email && ua.passwort === passwort
    );
    if (account) {
      return { kundeId: kunde.id, unteraccount: account };
    }
  }
  return null;
};

export const getUnteraccountsFuerKunde = (kundeId: number) => {
  const kunde = kunden.find(k => k.id === kundeId);
  return kunde ? kunde.unteraccounts : [];
};