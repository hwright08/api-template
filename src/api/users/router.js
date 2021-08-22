const express = require('express');
const router = express.Router();

const service = require('./service');

router.get('/', async (req, res) => {
  const users = await service.getAllUsers();
  res.json(users);
});

router.get('/test', async (req, res) => {
  const t = await service.testFunc();
  res.json(t);
});

router.get('/:id', async (req, res) => {
  const user = await service.getAllUsers(req.params.id);
  res.json(user);
});

module.exports = router;
