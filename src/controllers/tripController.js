import tripModel from '../models/tripModel';
import HelperUtils from '../helperUtils/helperUtils';

const { createTrip, getAllTrips } = tripModel;

class tripController {
  static async createNewTrip({ body }, res) {
    const [response] = await createTrip(body);
    return HelperUtils.serverResponse(response, res, 201);
  }
  
  static async fetchAllTrips({ body, query }, res) {
    const { is_admin: isAdmin } = body.user;
    const response = await getAllTrips(isAdmin, query);
    return HelperUtils.serverResponse(response, res, 200, 'trips');
  }
}

export default tripController;
