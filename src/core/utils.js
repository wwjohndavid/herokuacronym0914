import { Pool } from 'pg';
import env from 'dotenv';

import errorCodes from './pgErrorCodes';

env.config();

// eslint-disable-next-line import/no-mutable-exports
let pool;

if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    connectionString: process.env.TEST_DATABASE_URL,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

const query = async (sql, params, res) => {
  try {
    if (params.length > 0) return await pool.query(sql, params);
    return await pool.query(sql);
  } catch (error) {
    return res.status(500).json({
      message: error.message.replace(/['"]+/g, ''),
      error: errorCodes[error.code],
    });
  }
};

const matchStr = (str, queryset) => {
  const queryStr = str.replace(/ +(?= )/g, '');
  const regEx = new RegExp(queryStr, 'gi');

  const matches = [];
  queryset.forEach((acronym) => {
    if (acronym.acronym.match(regEx) || acronym.definition.match(regEx))
      matches.push(acronym);
  });
  return matches;
};

export { matchStr, pool, query };