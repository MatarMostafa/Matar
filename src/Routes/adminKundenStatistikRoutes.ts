import express from 'express';
import { getAdminStatistik } from '../Controllers/adminKundenStatistikController';

const router = express.Router();

router.get('/statistik', getAdminStatistik);

export default router;