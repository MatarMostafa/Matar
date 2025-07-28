"use strict";
// src/Utils/utils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameDate = exports.formatDate = exports.generateId = void 0;
// ✅ Zufällige ID generieren (z. B. für neue Objekte)
const generateId = () => {
    return Math.floor(Math.random() * 1000000);
};
exports.generateId = generateId;
// ✅ Einfaches Datumsformat (z. B. für Logs)
const formatDate = (date) => {
    return date.toISOString().split("T")[0];
};
exports.formatDate = formatDate;
// ✅ Vergleich zweier Daten (ohne Uhrzeit)
const isSameDate = (a, b) => {
    return (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate());
};
exports.isSameDate = isSameDate;
