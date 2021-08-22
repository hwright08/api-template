const pgPromise = require('pg-promise');
const { connection } = require('./settings');

const pgp = pgPromise({ schema: 'public' });

pgp.pg.types.setTypeParser(pgp.pg.types.builtins.TIMESTAMP, val => val);
pgp.pg.types.setTypeParser(pgp.pg.types.builtins.TIMESTAMPTZ, val => val);


const db = pgp(connection);

module.exports = db;
