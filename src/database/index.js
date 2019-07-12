import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const pool = new Pool({
  connectionString: process.env.TEST_DATABASE_URL,
});

const queryFunction = {
  async query(queryString, params) {
    try {
      const { rows } = await pool.query(queryString, params);
      return rows;
    } catch (error) {
      return error;
    }
  },
};

export default queryFunction;
