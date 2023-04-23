const express = require('express');
const router = express.Router();

const service = require('./service');

router.get('/:instructor_id', async (req, res) => {
  let students = await service.getStudents(req.params.instructor_id);
  res.json(students);
});

router.post('/:instructor_id', async (req, res) => {
  let { instructor_id: user_id } = req.params;
  await service.insertNewStudent({ ...req.body, ...req.params, user_id });
  res.json({ success: true });
});

module.exports = router;
