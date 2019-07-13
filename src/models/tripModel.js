import queryFunction from '../database';

const { query } = queryFunction;

const tripModel = {
  async createTrip({
    busId, origin, destination, tripDate, fare,
  }) {
    const sql = 'INSERT INTO trips(bus_id, origin, destination, trip_date, fare) VALUES($1, $2, $3, $4, $5) RETURNING *';
    return query(sql, [busId, origin, destination, tripDate, fare]);
  },
  
  async getAllTrips() {
    const sql = 'SELECT * FROM trips';
    return query(sql);
  },
};

export default tripModel;
