const express = require('express');
const router = express.Router();

const service = require('./service');

router.get('/', async (req, res) => {
  let ratings = await service.getRatings();
  res.json(ratings);
});

module.exports = router;
