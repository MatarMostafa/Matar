"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
// Routen-Imports
const mitarbeiterRoutes_1 = __importDefault(require("./Routes/mitarbeiterRoutes"));
const auftragRoutes_1 = __importDefault(require("./Routes/auftragRoutes"));
const autoPlanungRoutes_1 = __importDefault(require("./Routes/autoPlanungRoutes"));
const ampelBewertungsRoutes_1 = __importDefault(require("./Routes/ampelBewertungsRoutes"));
const emailServiceRoutes_1 = __importDefault(require("./Routes/emailServiceRoutes"));
const pushServiceRoutes_1 = __importDefault(require("./Routes/pushServiceRoutes"));
const notificationRoutes_1 = __importDefault(require("./Routes/notificationRoutes"));
const adminKundenStatistikRoutes_1 = __importDefault(require("./Routes/adminKundenStatistikRoutes"));
const adminUserStatistikRoutes_1 = __importDefault(require("./Routes/adminUserStatistikRoutes"));
const kundenServiceRoutes_1 = __importDefault(require("./Routes/kundenServiceRoutes"));
const zuweisungsRoutes_1 = __importDefault(require("./Routes/zuweisungsRoutes"));
const exportRoutes_1 = __importDefault(require("./Routes/exportRoutes"));
const benachrichtigungRoutes_1 = __importDefault(require("./Routes/benachrichtigungRoutes"));
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routen
app.use('/api/auth', authRoutes_1.default);
app.use('/api/mitarbeiter', mitarbeiterRoutes_1.default);
app.use('/api/auftraege', auftragRoutes_1.default);
app.use('/api/auto-planung', autoPlanungRoutes_1.default);
app.use('/api/ampel', ampelBewertungsRoutes_1.default);
app.use('/api/email', emailServiceRoutes_1.default);
app.use('/api/push', pushServiceRoutes_1.default);
app.use('/api/notifications', notificationRoutes_1.default);
app.use('/api/admin/kunden-statistik', adminKundenStatistikRoutes_1.default);
app.use('/api/admin/user-statistik', adminUserStatistikRoutes_1.default);
app.use('/api/kunden', kundenServiceRoutes_1.default);
app.use('/api/zuweisung', zuweisungsRoutes_1.default);
app.use('/api/export', exportRoutes_1.default);
app.use('/api/benachrichtigungen', benachrichtigungRoutes_1.default);
// Root
app.get('/', (_req, res) => {
    res.send('Service App API läuft...');
});
app.listen(PORT, () => {
    console.log(`🚀 Server läuft auf Port ${PORT}`);
});
