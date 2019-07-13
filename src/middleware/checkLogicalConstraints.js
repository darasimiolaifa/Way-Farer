import tripModel from '../models/tripModel';
import bookingModel from '../models/bookingModel';

const { getSingleTrip } = tripModel;
const { getSingleBooking } = bookingModel;

class LogicalConstraints {
  static async checkSeatsLeft({ body }, res, next) {
    let data;
    const [trip] = await getSingleTrip(body);
    if (!trip.seats_left > 0) {
      data = { status: 400, error: 'Sorry, this trip has been fully booked.' };
    } else if (body.seatNumber && body.seatNumber > trip.bus_capacity) {
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
  
  static async checkSeatNumberAvailability({ body }, res, next) {
    const { tripId, userId, seatNumber } = body;
    const [booking] = await getSingleBooking(tripId, userId);
    if (booking) {
      if (booking.seat_number === seatNumber && booking.user_id !== userId) {
        return res.status(400).send({ status: 400, error: 'Sorry, this seat number is no longer available.' });
      }
    }
    return next();
  }
}

export default LogicalConstraints;
