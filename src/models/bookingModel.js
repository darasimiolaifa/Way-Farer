import queryFunction from '../database';
import tripModel from './tripModel';

const { query } = queryFunction;
const { getSingleTrip } = tripModel;

const bookingModel = {
  async createBooking({ tripId, userId, seatNumber }) {
    let nextAvailableSeat;
    if (!seatNumber) {
      const [response] = await getSingleTrip({ tripId });
      const { bus_capacity: busCapacity, seats_left: seatsLeft } = response;
      nextAvailableSeat = (busCapacity - seatsLeft) + 1;
    } else nextAvailableSeat = seatNumber;
    
    const sql = 'INSERT INTO bookings(booking_id, trip_id, user_id, seat_number) VALUES(ROW($1, $2), $1, $2, $3) RETURNING *';
    return query(sql, [tripId, userId, nextAvailableSeat]);
  },
  
  async getSingleBooking(tripId, userId) {
    const sql = 'SELECT b.booking_id, b.trip_id, b.user_id, b.seat_number, t.origin, t.destination, t.trip_date, t.bus_id, u.first_name, u.last_name, u.email, (t.trip_date - CURRENT_DATE) AS days_left FROM bookings AS b INNER JOIN trips AS t USING(trip_id) INNER JOIN users AS u USING(user_id) WHERE (booking_id).trip_id = $1 AND (booking_id).user_id = $2';
    
    return query(sql, [tripId, userId]);
  },
};

export default bookingModel;
