import { Auftrag } from '../types/auftrag';
import { auftraege as auftragData } from '../data/auftraege';

export const getAllAuftraege = (): Auftrag[] => {
  return auftragData;
};

export const getAuftragById = (id: number): Auftrag | undefined => {
  return auftragData.find((a: Auftrag) => a.id === id);
};

export const createAuftrag = (auftrag: Auftrag): Auftrag => {
  auftragData.push(auftrag);
  return auftrag;
};

export const updateAuftrag = (id: number, updated: Partial<Auftrag>): Auftrag | undefined => {
  const index = auftragData.findIndex((a: Auftrag) => a.id === id);
  if (index !== -1) {
    auftragData[index] = { ...auftragData[index], ...updated };
    return auftragData[index];
  }
  return undefined;
};

export const deleteAuftrag = (id: number): boolean => {
  const index = auftragData.findIndex((a: Auftrag) => a.id === id);
  if (index !== -1) {
    auftragData.splice(index, 1);
    return true;
  }
  return false;
};