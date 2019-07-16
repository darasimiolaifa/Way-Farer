import queryFunction from '../database';

const { query } = queryFunction;

const busModel = {
  createBus({
    number_plate, manufacturer, model, year, capacity,
  }) {
    const sql = 'INSERT INTO buses(number_plate, manufacturer, model, year, capacity) VALUES($1, $2, $3, $4, $5) RETURNING bus_id AS id, number_plate, manufacturer, model, year, capacity';
    return query(sql, [number_plate, manufacturer, model, year, capacity]);
  },
  
  async getAllBuses() {
    const sql = 'SELECT bus_id AS id, number_plate, model, manufacturer, year, capacity FROM buses';
    return query(sql);
  },
  
  async getSingleBus({ bus_id }) {
    const sql = 'SELECT bus_id AS id, number_plate, model, manufacturer, year, capacity FROM buses WHERE bus_id = $1';
    return query(sql, [bus_id]);
  },
  
  async updateBus({
    id, number_plate, manufacturer, model, year, capacity,
  }) {
    const sql = 'UPDATE buses SET number_plate = $1, manufacturer = $2, model = $3, year = $4, capacity = $5 WHERE bus_id = $6 RETURNING *';
    return query(sql, [number_plate, manufacturer, model, year, capacity, id]);
  },
  
  async deleteBus({ bus_id }) {
    const sql = 'DELETE FROM buses WHERE bus_id = $1 RETURNING *';
    return query(sql, [bus_id]);
  },
};

export default busModel;
