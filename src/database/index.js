import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const pool = new Pool({
  connectionString: process.env.TEST_DATABASE_URL,
});

const queryFunction = {
  query(queryString, params) {
    return new Promise((resolve, reject) => {
      pool.query(queryString, params)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  },
};

export default queryFunction;
