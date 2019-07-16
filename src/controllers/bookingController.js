import bookingModel from '../models/bookingModel';
import HelperUtils from '../helperUtils/helperUtils';

const {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
} = bookingModel;

class bookingController {
  static async createNewBooking({ body }, res) {
    const [response] = await createBooking(body);
    let booking;
    if (response) {
      const { trip_id, user_id } = response;
      [booking] = await getSingleBooking(trip_id, user_id);
      console.log(booking);
    }
    return HelperUtils.serverResponse(booking, res, 201);
  }
  
  static async fetchAllBookings({ body }, res) {
    const { user } = body;
    const response = await getAllBookings(user);
    return HelperUtils.serverResponse(response, res, 200, 'bookings');
  }
  
  static async fetchSingleBooking({ params }, res) {
    const { booking_id } = params;
    const [trip_id, user_id] = booking_id.match(/[0-9]+,[0-9]+/)[0].split(',');
    const [response] = await getSingleBooking(trip_id, user_id);
    return HelperUtils.serverResponse(response, res);
  }
  
  static async updateOldBooking({ body, params }, res) {
    const response = await updateBooking(body, params);
    return HelperUtils.serverResponse(response, res, 200, 'Booking', 'updated');
  }
  
  static async deleteOldBooking({ params }, res) {
    const { booking_id } = params;
    const [trip_id, user_id] = booking_id.match(/[0-9]+,[0-9]+/)[0].split(',');
    const [response] = await deleteBooking('booking_id', trip_id, user_id);
    return HelperUtils.serverResponse(response, res, 200, 'Booking', 'deleted');
  }
}

export default bookingController;
