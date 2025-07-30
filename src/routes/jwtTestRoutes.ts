import express from 'express';
import { verifyToken } from '../Middleware/verifyToken';

const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  const user = (req as any).user;
  res.status(200).json({
    message: 'Token gültig',
    user,
  });
});

export default router;