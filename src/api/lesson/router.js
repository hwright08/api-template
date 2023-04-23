const express = require('express');
const router = express.Router();

const service = require('./service');

router.get('/:student_id/:rating_id', async (req, res) => {
  let { student_id, rating_id } = req.params;
  let lessons = await service.getLessons(student_id, rating_id);
  res.json(lessons);
});

router.post('/:student_id', async (req, res) => {
  await service.upsertStudentLesson(req.body);
  res.json({ success: true });
});

module.exports = router;
