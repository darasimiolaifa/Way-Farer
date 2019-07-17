import tripModel from '../models/tripModel';
import bookingModel from '../models/bookingModel';

const { getSingleTrip } = tripModel;
const { getSingleBooking } = bookingModel;

class LogicalConstraints {
  static async checkSeatsLeft({ body }, res, next) {
    let data;
    const { seat_number } = body;
    const [trip] = await getSingleTrip(body);
    if (!trip.seats_left > 0) {
      data = { status: 400, error: 'Sorry, this trip has been fully booked.' };
    } else if (seat_number && seat_number > trip.bus_capacity) {
      data = { status: 400, error: `Sorry, the maximum number of seats for this trip is ${trip.bus_capacity}` };
    }
    if (data) return res.status(400).send(data);
    return next();
  }
  
  static async checkDaysLeft({ body }, res, next) {
    const [trip] = await getSingleTrip(body);
    if (!trip.days_left > 0) {
      return res.status(400).send({ status: 400, error: 'Sorry, this trip has taken place already.' });
    }
    return next();
  }
  
  static async checkSeatNumberAvailability({ body, params }, res, next) {
    const { user_id, seat_number } = body;
    const { booking_id } = params;
    const [booking] = await getSingleBooking(booking_id);
    if (booking) {
      if (booking.seat_number === seat_number && booking.user_id !== user_id) {
        return res.status(400).send({ status: 400, error: 'Sorry, this seat number is no longer available.' });
      }
    }
    return next();
  }
}

export default LogicalConstraints;
