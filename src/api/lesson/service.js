const pick = require('lodash/pick');
const source = require('./source');
const ratingService = require('../rating/service');
const DB = require('../../../db');

exports.getLessons = source.getLessons;

exports.upsertStudentLesson = upsertStudentLesson;
async function upsertStudentLesson(data, db = DB) {
  return await db.tx(async t => {
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
    await source.upsertStudentLesson(model, where, t);

    // check to see if the last lesson is done
    let { incomplete, rating_id } = await ratingService.ratingIsComplete(data.lesson_id, data.student_id, t);
    let end_date = incomplete ? null : dayjs();

    await ratingService.upsertStudentRating(
      { end_date },
      { student_id: data.student_id, rating_id },
      t
    );
  });
}
