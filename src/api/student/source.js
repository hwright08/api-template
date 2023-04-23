const curry = require('lodash/curry');
const { insertIntoTable } = require('../../db-helpers');
const DB = require('../../../db');

exports.insertStudent = curry(insertIntoTable)('student');

exports.getStudents = getStudents;
async function getStudents(instructor_id, db = DB) {
  return db.any(/*sql*/`
    SELECT
      s.student_id,
      s.student_name,
      s.is_active,
      s.notes,
      s.instructor_id,
      cr.current_rating_id,
      cr.current_rating,
      cr.current_rating_select_key
    FROM student s
    LEFT JOIN (
      SELECT DISTINCT ON (student_id)
        rm.student_id,
        rm.rating_id AS current_rating_id,
        r.title AS current_rating,
        r.select_key AS current_rating_select_key
      FROM student_rating_map rm
      JOIN rating r ON r.rating_id = rm.rating_id
      WHERE end_date IS NULL
      ORDER BY rm.student_id, rm.start_date DESC
    ) cr ON cr.student_id = s.student_id
    WHERE instructor_id = $[instructor_id]
  `, { instructor_id });
}
