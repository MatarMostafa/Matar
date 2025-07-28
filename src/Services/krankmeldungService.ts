// src/Services/krankmeldungService.ts

interface Krankmeldung {
  userId: string;
  datum: string;
  grund: string;
}

const krankmeldungen: Krankmeldung[] = [];

export const meldeKrankheitService = async (data: Krankmeldung): Promise<Krankmeldung> => {
  krankmeldungen.push(data);
  return data;
};

export const getKrankmeldungenService = async (): Promise<Krankmeldung[]> => {
  return krankmeldungen;
};