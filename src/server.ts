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
import mitarbeiterRoutes from './routes/mitarbeiterRoutes';
import auftragRoutes from './routes/auftragRoutes';
import autoPlanungRoutes from './routes/autoPlanungRoutes';
import ampelBewertungsRoutes from './routes/ampelBewertungsRoutes';
import emailServiceRoutes from './routes/emailServiceRoutes';
import pushServiceRoutes from './routes/pushServiceRoutes';
import notificationRoutes from './routes/notificationRoutes';
import adminKundenStatistikRoutes from './routes/adminKundenStatistikRoutes';
import adminUserStatistikRoutes from './routes/adminUserStatistikRoutes';
import kundenServiceRoutes from './routes/kundenServiceRoutes';
import zuweisungsRoutes from './routes/zuweisungsRoutes';
import exportRoutes from './routes/exportRoutes';
import benachrichtigungRoutes from './routes/benachrichtigungRoutes';
import mitarbeiterSperreRoutes from './routes/mitarbeiterSperreRoutes'; // NEU

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
