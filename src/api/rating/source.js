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
