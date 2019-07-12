/* eslint-disable object-curly-newline */
import queryFunction from '../database';

const { query } = queryFunction;

const busModel = {
  createBus({ numberPlate, manufacturer, model, year, capacity }) {
    const sql = 'INSERT INTO buses(number_plate, manufacturer, model, year, capacity) VALUES($1, $2, $3, $4, $5) RETURNING *';
    return query(sql, [numberPlate, manufacturer, model, year, capacity]);
  },
  
  async getAllBuses() {
    const sql = 'SELECT * FROM buses';
    return query(sql);
  },
};

export default busModel;
