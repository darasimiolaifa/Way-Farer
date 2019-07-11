/* eslint-disable object-curly-newline */
import queryFunction from '../database';

const { query } = queryFunction;

const UserModel = {
  async createUser({ firstName, lastName, email, password }) {
    const sql = 'INSERT INTO users(first_name, last_name, password, email) VALUES ($1, $2, $3, $4) RETURNING user_id, first_name, last_name, email, is_admin';
    
    try {
      const { rows } = await query(sql, [firstName, lastName, password, email]);
      return rows;
    } catch (error) {
      return error;
    }
  },
  
  async getSingleUser(field, value, sendPassWord = true) {
    let sql;
    if (sendPassWord) sql = `SELECT * FROM users WHERE ${field} = $1`;
    else sql = `SELECT user_id, first_name, last_name, email, is_admin FROM users WHERE ${field} = $1`;
    try {
      const { rows } = await query(sql, [value]);
      return rows;
    } catch (error) {
      return error;
    }
  },
};

export default UserModel;
