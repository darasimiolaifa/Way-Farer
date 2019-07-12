/* eslint-disable object-curly-newline */
import queryFunction from '../database';

const { query } = queryFunction;

const UserModel = {
  async getAllUsers() {
    const sql = 'SELECT * FROM users';
    
    return query(sql);
  },
  
  async createUser({ firstName, lastName, email, password }) {
    const sql = 'INSERT INTO users(first_name, last_name, password, email) VALUES ($1, $2, $3, $4) RETURNING user_id, first_name, last_name, email, is_admin';
    
    return query(sql, [firstName, lastName, password, email]);
  },
  
  async getSingleUser(field, value, sendPassWord = true) {
    let sql;
    if (sendPassWord) sql = `SELECT * FROM users WHERE ${field} = $1`;
    else sql = `SELECT user_id, first_name, last_name, email, is_admin FROM users WHERE ${field} = $1`;
    
    return query(sql, [value]);
  },
  
  async updateUser(body, params) {
    const { firstName, lastName, email } = body;
    const { userId } = params;
    const sql = 'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE user_id = $4 RETURNING user_id, first_name, last_name, email, is_admin';
    
    return query(sql, [firstName, lastName, email, userId]);
  },
  
  async deleteUser({ userId }) {
    const sql = 'DELETE FROM users WHERE user_id = $1 RETURNING user_id, email, first_name, last_name';
    
    return query(sql, [userId]);
  },
};

export default UserModel;
