import queryFunction from '../database';

const { query, buildTripsQuery } = queryFunction;

const tripModel = {
  async createTrip({
    bus_id, origin, destination, trip_date, fare,
  }) {
    const sql = 'INSERT INTO trips(bus_id, origin, destination, trip_date, fare) VALUES($1, $2, $3, $4, $5) RETURNING trip_id AS id, bus_id, origin, destination, trip_date, fare';
    return query(sql, [bus_id, origin, destination, trip_date, fare]);
  },
  
  async getAllTrips(is_admin, params) {
    const { finalQuery, queryParameters } = buildTripsQuery(is_admin, params);
    return query(finalQuery, queryParameters);
  },
  
  async getSingleTrip({ trip_id }) {
    const sql = 'SELECT t.trip_id AS id, t.bus_id, t.origin, t.destination, t.fare, t.trip_date, t.status, b.manufacturer AS bus_manufacturer, b.model AS bus_model, b.year AS bus_production_year, b.capacity AS bus_capacity, (t.trip_date - CURRENT_DATE) AS days_left, (b.capacity - (SELECT COUNT(*) FROM bookings AS bk WHERE bk.trip_id = t.trip_id)) AS seats_left FROM trips AS t INNER JOIN buses AS b USING(bus_id) WHERE trip_id = $1';
    
    return query(sql, [trip_id]);
  },
  
  async updateTrip({
    id, bus_id, origin, destination, fare, trip_date,
  }) {
    const sql = 'UPDATE trips SET bus_id = $1, origin = $2, destination = $3, fare = $4, trip_date = $5 WHERE trip_id = $6 RETURNING *';
    return query(sql, [bus_id, origin, destination, fare, trip_date, id]);
  },
  
  async updateTripStatus({ trip_id }) {
    const sql = 'UPDATE trips SET status = $1 WHERE trip_id = $2 RETURNING *';
    return query(sql, ['cancelled', trip_id]);
  },
  
  async deleteTrip({ trip_id }) {
    const sql = 'DELETE FROM trips WHERE trip_id = $1 RETURNING *';
    return query(sql, [trip_id]);
  },
};

export default tripModel;
