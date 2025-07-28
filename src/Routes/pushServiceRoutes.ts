import express from 'express';
import { sendePush } from '../Controllers/pushServiceController';

const router = express.Router();

router.post('/senden', sendePush);

export default router;