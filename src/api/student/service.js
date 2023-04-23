const pick = require('lodash/pick');
const dayjs = require('dayjs');
const DB = require('../../../db');

const source = require('./source');

const ratingService = require('../rating/service');

exports.getStudents = source.getStudents;
exports.getStudent = source.getStudent;

exports.insertNewStudent = insertNewStudent;
async function insertNewStudent(data, db = DB) {
  return db.tx(async t => {
    data.user_id = data.instructor_id;
    let studentFields = ['instructor_id', 'student_name', 'user_id'];
    let studentModel = pick(data, studentFields);
    let student_id = await source.insertStudent(studentModel, t);

    let start_date = data.start_date || dayjs().format('YYYY-MM-DD');
    let ratingFields = ['rating_id', 'user_id'];
    let ratingModel = {
      ...pick(data, ratingFields),
      student_id,
      start_date,
    };
    await ratingService.upsertStudentRating(ratingModel, {}, t);
  });
}
