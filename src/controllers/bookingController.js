import bookingModel from '../models/bookingModel';
import HelperUtils from '../helperUtils/helperUtils';

const { createBooking, getAllBookings } = bookingModel;

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
}

export default bookingController;
