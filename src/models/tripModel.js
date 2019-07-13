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
  
  async getSingleTrip({ tripId }) {
    const sql = 'SELECT t.trip_id, t.bus_id, t.origin, t.destination, t.fare, t.trip_date, t.status, b.manufacturer AS bus_manufacturer, b.model AS bus_model, b.year AS bus_production_year, b.capacity AS bus_capacity, (t.trip_date - CURRENT_DATE) AS days_left, (b.capacity - (SELECT COUNT(*) FROM bookings AS bk WHERE bk.trip_id = t.trip_id)) AS seats_left FROM trips AS t INNER JOIN buses AS b USING(bus_id) WHERE trip_id = $1 ORDER BY status ASC, days_left ASC';
    
    return query(sql, [tripId]);
  },
  
  async updateTrip({
    tripId, busId, origin, destination, fare, tripDate,
  }) {
    const sql = 'UPDATE trips SET bus_id = $1, origin = $2, destination = $3, fare = $4, trip_date = $5 WHERE trip_id = $6 RETURNING *';
    return query(sql, [busId, origin, destination, fare, tripDate, tripId]);
  },
};

export default tripModel;
