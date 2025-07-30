import express from 'express';
import { sendePush } from '../controllers/pushServiceController';

const router = express.Router();

router.post('/senden', sendePush);

export default router;