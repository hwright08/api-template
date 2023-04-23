const express = require('express');
const router = express.Router();

const service = require('./service');

router.get('/', async (req, res) => {
  let students = await service.getStudents(req.query.instructor_id);
  res.json(students);
});

router.get('/:student_id', async (req, res) => {
  let student = await service.getStudent(req.params.student_id);
  res.json(student);
});

router.post('/', async (req, res) => {
  await service.insertNewStudent(req.body);
  res.json({ success: true });
});

router.post('/:student_id', async (req, res) => {
  await service.updateStudent(
    req.body,
    { student_id: req.params.student_id }
  );
  res.json({ success: true });
});

module.exports = router;
