import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
  
  buildTripsQuery(isAdmin, params) {
    let sql;
    let filterQuery = '';
    let finalQuery;
    
    const {
      origin,
      destination,
      from,
      to,
    } = params;
    
    const queryParameters = [];
    const originalQuery = 'SELECT t.trip_id AS id, t.bus_id, t.origin, t.destination, t.fare, t.trip_date, t.status, b.manufacturer AS bus_manufacturer, b.model AS bus_model, b.year AS bus_production_year, b.capacity AS bus_capacity, (t.trip_date - CURRENT_DATE) AS days_left, (b.capacity - (SELECT COUNT(*) FROM bookings AS bk WHERE bk.trip_id = t.trip_id)) AS seats_left FROM trips AS t INNER JOIN buses AS b USING(bus_id)';
    
    if (origin) {
      if (filterQuery.length > 0) filterQuery += ' INTERSECT ';
      filterQuery += `${originalQuery} WHERE t.origin = $${queryParameters.length + 1}`;
      queryParameters.push(origin);
    }
    if (destination) {
      if (filterQuery.length > 0) filterQuery += ' INTERSECT ';
      filterQuery += `${originalQuery} WHERE t.destination = $${queryParameters.length + 1}`;
      queryParameters.push(destination);
    }
    if (from) {
      if (filterQuery.length > 0) filterQuery += ' INTERSECT ';
      filterQuery += `${originalQuery} WHERE t.trip_date >= $${queryParameters.length + 1}`;
      queryParameters.push(from);
    }
    if (to) {
      if (filterQuery.length > 0) filterQuery += ' INTERSECT ';
      filterQuery += `${originalQuery} WHERE t.trip_date >= CURRENT_DATE AND t.trip_date <= $${queryParameters.length + 1}`;
      queryParameters.push(to);
    }
    
    if (isAdmin) {
      sql = `${originalQuery} ORDER BY status ASC, days_left ASC`;
    } else {
      sql = `${originalQuery} WHERE status = $${queryParameters.length + 1} AND t.trip_date > CURRENT_DATE ORDER BY days_left ASC`;
      queryParameters.push('active');
    }
    
    if (filterQuery) finalQuery = `${filterQuery} INTERSECT ${sql}`;
    else finalQuery = sql;
    return { finalQuery, queryParameters };
  },
};

export default queryFunction;
