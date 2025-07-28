// src/Utils/utils.ts

// ✅ Zufällige ID generieren (z. B. für neue Objekte)
export const generateId = (): number => {
  return Math.floor(Math.random() * 1000000);
};

// ✅ Einfaches Datumsformat (z. B. für Logs)
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// ✅ Vergleich zweier Daten (ohne Uhrzeit)
export const isSameDate = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};