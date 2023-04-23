const curry = require('lodash/curry');
const { upsertTable } = require('../../db-helpers');
const DB = require('../../../db');

exports.upsertStudentRating = curry(upsertTable)('student_rating_map');

exports.getRatings = getRatings;
async function getRatings(db = DB) {
  return db.tx(async t => {
    return db.any(/*sql*/`
      SELECT
        rating_id,
        select_key,
        title
      FROM rating
    `);
  });
}


exports.ratingIsComplete = ratingIsComplete;
async function ratingIsComplete(lesson_id, student_id, db = DB) {
  return await db.one(/*sql*/`
    SELECT
      COUNT(*) > 0 AS incomplete,
      l.rating_id
    FROM lesson l
    LEFT JOIN student_lesson_map slm
      ON slm.lesson_id = l.lesson_id
      AND slm.student_id = $[student_id]
    WHERE slm.is_complete IS NULL AND l.rating_id IN (
      SELECT rating_id
      FROM lesson
      WHERE lesson_id = $[lesson_id]
    )
    GROUP BY l.rating_id
  `, { lesson_id, student_id });
}
