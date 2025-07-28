"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.automatischeEinsatzplanungHandler = void 0;
const automatischeEinsatzplanungHandler = async (req, res, next) => {
    try {
        // Dummy-Rückgabe
        res.status(200).json({ message: 'Automatische Einsatzplanung durchgeführt' });
    }
    catch (error) {
        next(error);
    }
};
exports.automatischeEinsatzplanungHandler = automatischeEinsatzplanungHandler;
