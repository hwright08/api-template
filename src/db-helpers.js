const pgp = require('pg-promise');
const pg = pgp();
const pick = require('lodash/pick');
const DB = require('../db');

exports.insertIntoTable = insertIntoTable;
async function insertIntoTable(tableName, model, db = DB) {
  return db.tx(async t => {
    if (model.user_id) {
      model.add_by_id = model.user_id;
      model.mod_by_id = model.user_id;
    }

    let cleanModel = await cleanData(tableName, model, t);
    let insert = pg.helpers.insert(
      cleanModel,
      Object.keys(cleanModel),
      tableName,
    );
    let record = await t.one(`${insert} RETURNING ${tableName}_id`);
    return record[`${tableName}_id`];
  });
}


exports.updateTable = updateTable;
async function updateTable(tableName, model, where, db = DB) {
  return db.tx(async t => {
    if (model.user_id) {
      model.mod_by_id = model.user_id;
    }

    let cleanModel = cleanData(tableName, model, t);
    let update = pg.helpers.update(cleanModel, null, tableName);
    let whereSql = objToWhereSql(where);

    let record = await db.any(/*sql*/`${update} ${whereSql} RETURNING ${tableName}_id`);
    if (record.length == 1) return record[0][`${tableName}_id`];
    if (record.length > 1) return record.map(r => r[`${tableName}_id`]);
  });
}


exports.upsertTable = upsertTable;
async function upsertTable(tableName, model, where = {}, db = DB) {
  return db.tx(async t => {
    let isNewRecord = !recordExists(tableName, where, t)
    if (!isNewRecord) {
      return await insertIntoTable(tableName, model, t);
    } else {
      return await updateTable(tableName,  model, where, t);
    }
  });
}

async function recordExists(tableName, where, db = DB) {
  let whereSql = objToWhereSql(where);
  let primaryKey = tableName + '_id';
  return await db.oneOrNone(/*sql*/`
    SELECT $[primaryKey:name]
    FROM $[tableName:name]
    ${whereSql}
  `, { tableName, primaryKey });
}

exports.objToWhereSql = objToWhereSql;
function objToWhereSql(where) {
  let whereKeys  = Object.keys(where);
  let whereClause = '';
  if (whereKeys.length) {
    whereKeys.forEach((key, index) => {
      if (!index) whereClause += `WHERE ${key} = ${where[key]}`;
      else whereClause += `, AND ${key} = ${where[key]}`;
    });
  }
  return whereClause;
}


async function cleanData(tableName, model, db = DB) {
  return db.task(async t => {
    let columns = await db.map(
      /*sql*/`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = $[schema]
          AND table_name = $[tableName]
      `,
      { tableName, schema: process.env.DB_SCHEMA },
      row => row.column_name,
    );

    return pick(model, columns);
  });
}
