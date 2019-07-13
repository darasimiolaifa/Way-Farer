import bookingModel from '../models/bookingModel';
import HelperUtils from '../helperUtils/helperUtils';

const { createBooking } = bookingModel;

class bookingController {
  static async createNewBooking({ body }, res) {
    const [response] = await createBooking(body);
    return HelperUtils.serverResponse(response, res, 201);
  }
}

export default bookingController;
