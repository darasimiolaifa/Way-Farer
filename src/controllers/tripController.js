import tripModel from '../models/tripModel';
import HelperUtils from '../helperUtils/helperUtils';

const { createTrip } = tripModel;

class tripController {
  static async createNewTrip({ body }, res) {
    const [response] = await createTrip(body);
    return HelperUtils.serverResponse(response, res, 201);
  }
}

export default tripController;
