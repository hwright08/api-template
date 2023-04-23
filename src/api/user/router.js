const express = require('express');
const router = express.Router();

const service = require('./service');

router.get('/', async (req, res) => {
  const users = await service.getAllUsers();
  res.json(users);
});

module.exports = router;
