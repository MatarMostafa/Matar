import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routen-Imports
import mitarbeiterRoutes from './Routes/mitarbeiterRoutes';
import auftragRoutes from './Routes/auftragRoutes';
import autoPlanungRoutes from './Routes/autoPlanungRoutes';
import ampelBewertungsRoutes from './Routes/ampelBewertungsRoutes';
import emailServiceRoutes from './Routes/emailServiceRoutes';
import pushServiceRoutes from './Routes/pushServiceRoutes';
import notificationRoutes from './Routes/notificationRoutes';
import adminKundenStatistikRoutes from './Routes/adminKundenStatistikRoutes';
import adminUserStatistikRoutes from './Routes/adminUserStatistikRoutes';
import kundenServiceRoutes from './Routes/kundenServiceRoutes';
import zuweisungsRoutes from './Routes/zuweisungsRoutes';
import exportRoutes from './Routes/exportRoutes';
import benachrichtigungRoutes from './Routes/benachrichtigungRoutes';
import mitarbeiterSperreRoutes from './Routes/mitarbeiterSperreRoutes'; // NEU

// Routen verwenden
app.use('/api/mitarbeiter', mitarbeiterRoutes);
app.use('/api/auftraege', auftragRoutes);
app.use('/api/auto-planung', autoPlanungRoutes);
app.use('/api/ampel', ampelBewertungsRoutes);
app.use('/api/email', emailServiceRoutes);
app.use('/api/push', pushServiceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin/kunden-statistik', adminKundenStatistikRoutes);
app.use('/api/admin/user-statistik', adminUserStatistikRoutes);
app.use('/api/kunden', kundenServiceRoutes);
app.use('/api/zuweisung', zuweisungsRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/benachrichtigungen', benachrichtigungRoutes);
app.use('/api/mitarbeiter-sperre', mitarbeiterSperreRoutes); // NEU

// Root Route
app.get('/', (_req, res) => {
  res.send('Service App API läuft...');
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
