import express from 'express';
import { getAllAuftraege } from '../Controllers/auftragController';

const router = express.Router();

router.get('/', getAllAuftraege);

export default router;