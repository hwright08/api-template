const curry = require('lodash/curry');
const { upsertTable } = require('../../db-helpers');
const DB = require('../../../db');

exports.getLessons = getLessons;
async function getLessons(student_id, rating_id, db = DB) {
  return db.any(/*sql*/`
    SELECT
      l.lesson_id,
      l.stage_number,
      l.lesson_number,
      l.tco_page_number,
      l.title AS lesson_title,
      lt.select_key AS lesson_select_key,
      lt.title AS lesson_type,
      slm.student_lesson_map_id,
      slm.student_id,
      slm.notes,
      slm.is_complete,
      slm.scheduled_date
    FROM lesson l
    JOIN lesson_type lt ON lt.lesson_type_id = l.lesson_type_id
    LEFT JOIN student_lesson_map slm
      ON slm.lesson_id = l.lesson_id
      AND slm.student_id = $[student_id]
    WHERE l.rating_id = $[rating_id]
    ORDER BY l.stage_number, l.lesson_number
  `, { student_id, rating_id });
}


exports.upsertStudentLesson = curry(upsertTable)('student_lesson_map');
