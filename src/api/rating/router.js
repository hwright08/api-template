const express = require('express');
const router = express.Router();

const service = require('./service');

router.get('/', async (req, res) => {
  let ratings = await service.getRatings();
  res.json(ratings);
});

router.post('/student/:student_id', async (req, res) => {
  console.log(req.body, req.params);
  let where = {
    student_id: req.params.student_id,
    rating_id: req.body.rating_id,
  };
  await service.upsertStudentRating(req.body, where);
  res.json({ success: true });
});

module.exports = router;
