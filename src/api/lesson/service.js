const pick = require('lodash/pick');
const source = require('./source');
const DB = require('../../../db');

exports.getLessons = source.getLessons;

exports.upsertStudentLesson = upsertStudentLesson;
async function upsertStudentLesson(data, db = DB) {
  let fields = [
    'student_id',
    'lesson_id',
    'notes',
    'is_complete',
    'scheduled_date',
    'user_id',
  ];

  let model = pick(data, fields);

  let where = pick(data, ['student_id', 'lesson_id']);3
  await source.upsertStudentLesson(model, where, db);
}
