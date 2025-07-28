"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminStatistik = void 0;
const adminUserStatistikService_1 = require("../Services/adminUserStatistikService");
const getAdminStatistik = async (req, res) => {
    try {
        const statistik = await (0, adminUserStatistikService_1.getAdminUserStatistik)();
        res.status(200).json(statistik);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Admin-Statistik:', error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Admin-Statistik' });
    }
};
exports.getAdminStatistik = getAdminStatistik;
