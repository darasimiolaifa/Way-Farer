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
    return HelperUtils.serverResponse(response, res, 201);
  }
  
  static async fetchAllBookings({ body }, res) {
    const { user } = body;
    const response = await getAllBookings(user);
    return HelperUtils.serverResponse(response, res, 200, 'bookings');
  }
  
  static async fetchSingleBooking({ params }, res) {
    const { bookingId } = params;
    const [tripId, userId] = bookingId.match(/[0-9]+,[0-9]+/)[0].split(',');
    const [response] = await getSingleBooking(tripId, userId);
    return HelperUtils.serverResponse(response, res);
  }
  
  static async updateOldBooking({ body, params }, res) {
    const response = await updateBooking(body, params);
    return HelperUtils.serverResponse(response, res, 200, 'Booking', 'updated');
  }
  
  static async deleteOldBooking({ params }, res) {
    const { bookingId } = params;
    const [tripId, userId] = bookingId.match(/[0-9]+,[0-9]+/)[0].split(',');
    const [response] = await deleteBooking('booking_id', tripId, userId);
    return HelperUtils.serverResponse(response, res, 200, 'Booking', 'deleted');
  }
}

export default bookingController;
