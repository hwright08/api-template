import DB from '../../db';

export default {
  async getAllMessages(db = DB) {
    return db.any(`
      SELECT *
      FROM messages
    `);
  }
};
