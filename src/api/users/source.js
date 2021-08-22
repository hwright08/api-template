const pg = require('pg-promise');
const DB = require('../../../db');

module.exports = {
  async testFunc(db = DB) {
    return await db.one(/*sql*/`SELECT test FROM dual`);
  }
};
