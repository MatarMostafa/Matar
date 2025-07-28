import express, { Request, Response } from 'express';
import { sperreMitarbeiter, freigebenMitarbeiter } from '../Controllers/ausfallController';

const router = express.Router();

router.post('/sperren', (req: Request, res: Response) => sperreMitarbeiter(req, res));
router.post('/freigeben', (req: Request, res: Response) => freigebenMitarbeiter(req, res));

export default router;