import { Router } from 'express';
import messagesRouter from './api/messages/route';

const router = Router();

router.get('/', (req, res) => res.json({ success: true }));

router.use('/messages', messagesRouter);

export default router;
