import { Router } from 'express';
import service from './service';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await service.getAllMessages();
  res.json(messages);
});

export default router;
