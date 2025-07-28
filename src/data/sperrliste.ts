export interface SperrEintrag {
  mitarbeiterId: number;
  kundeId: number;
  kommentar: string;
  gesperrtAm: Date;
}

export const sperrliste: SperrEintrag[] = [];