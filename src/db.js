import pgp from 'pg-promise';
import { connectionString } from './settings';

const instance = pgp();

const cn = connectionString;
const db = instance(cn);

module.exports = db;
