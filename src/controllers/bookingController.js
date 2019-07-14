import bookingModel from '../models/bookingModel';
import HelperUtils from '../helperUtils/helperUtils';

const {
  createBooking,
  getAllBookings,
  getSingleBooking,
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
}

export default bookingController;
