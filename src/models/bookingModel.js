import queryFunction from '../database';
import tripModel from './tripModel';

const { query } = queryFunction;
const { getSingleTrip } = tripModel;

const bookingModel = {
  async createBooking({ trip_id, user, seat_number }) {
    let nextAvailableSeat;
    if (!seat_number) {
      const [response] = await getSingleTrip({ trip_id });
      const { bus_capacity, seats_left } = response;
      nextAvailableSeat = (bus_capacity - seats_left) + 1;
    } else nextAvailableSeat = seat_number;
    
    const sql = 'INSERT INTO bookings(booking_id, trip_id, user_id, seat_number) VALUES(ROW($1, $2), $1, $2, $3) RETURNING booking_id AS id, trip_id, user_id, seat_number';
    return query(sql, [trip_id, user.id, nextAvailableSeat]);
  },
  
  async getSingleBooking(trip_id, user_id) {
    const sql = 'SELECT b.booking_id AS id, b.trip_id, b.user_id, b.seat_number, t.origin, t.destination, t.trip_date, t.bus_id, u.first_name, u.last_name, u.email, (t.trip_date - CURRENT_DATE) AS days_left FROM bookings AS b INNER JOIN trips AS t USING(trip_id) INNER JOIN users AS u USING(user_id) WHERE (booking_id).trip_id = $1 AND (booking_id).user_id = $2';
    
    return query(sql, [trip_id, user_id]);
  },
  
  async getAllBookings({ is_admin, user_id }) {
    let sql = 'SELECT b.booking_id AS id, b.trip_id, b.user_id, b.seat_number, t.origin, t.destination, t.trip_date, t.bus_id, u.first_name, u.last_name, u.email, (t.trip_date - CURRENT_DATE) AS days_left FROM bookings AS b INNER JOIN trips AS t USING(trip_id) INNER JOIN users AS u USING(user_id)';
    const queryParams = [];
    
    if (!is_admin) {
      sql += ' WHERE b.user_id = $1';
      queryParams.push(user_id);
    }
    
    return query(sql, queryParams);
  },
  
  async updateBooking(body, params) {
    const { trip_id, user_id, seat_number } = body;
    const { trip_id: paramsTripid, user_id: paramsUserId } = params.booking_id;
    const sql = 'UPDATE bookings SET trip_id = $1, user_id = $2, seat_number = $3 WHERE (booking_id).trip_id = $4 AND (booking_id).user_id = $5 RETURNING *';
    return query(sql, [trip_id, user_id, seat_number, paramsTripid, paramsUserId]);
  },
  
  async deleteBooking(field, trip_id, user_id) {
    const sql = `DELETE FROM bookings WHERE (${field}).trip_id = $1 AND (${field}).user_id = $2 RETURNING *`;
    return query(sql, [trip_id, user_id]);
  },
};

export default bookingModel;
