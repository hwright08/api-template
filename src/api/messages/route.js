const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'getting all of the messages' });
});

export default router;
