import tripModel from '../models/tripModel';

const { getSingleTrip } = tripModel;

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
}

export default LogicalConstraints;
