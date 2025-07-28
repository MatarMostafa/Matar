"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuftrag = exports.updateAuftrag = exports.createAuftrag = exports.getAuftragById = exports.getAllAuftraege = void 0;
const auftraege_1 = require("../data/auftraege");
const getAllAuftraege = () => {
    return auftraege_1.auftragData;
};
exports.getAllAuftraege = getAllAuftraege;
const getAuftragById = (id) => {
    return auftraege_1.auftragData.find((a) => a.id === id);
};
exports.getAuftragById = getAuftragById;
const createAuftrag = (auftrag) => {
    auftraege_1.auftragData.push(auftrag);
    return auftrag;
};
exports.createAuftrag = createAuftrag;
const updateAuftrag = (id, updated) => {
    const index = auftraege_1.auftragData.findIndex((a) => a.id === id);
    if (index !== -1) {
        auftraege_1.auftragData[index] = { ...auftraege_1.auftragData[index], ...updated };
        return auftraege_1.auftragData[index];
    }
    return undefined;
};
exports.updateAuftrag = updateAuftrag;
const deleteAuftrag = (id) => {
    const index = auftraege_1.auftragData.findIndex((a) => a.id === id);
    if (index !== -1) {
        auftraege_1.auftragData.splice(index, 1);
        return true;
    }
    return false;
};
exports.deleteAuftrag = deleteAuftrag;
