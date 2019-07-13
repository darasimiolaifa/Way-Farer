import tripModel from '../models/tripModel';
import HelperUtils from '../helperUtils/helperUtils';

const {
  createTrip,
  getAllTrips,
  getSingleTrip,
  updateTrip,
} = tripModel;

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
  
  static async fetchSingleTrip({ params }, res) {
    const [response] = await getSingleTrip(params);
    return HelperUtils.serverResponse(response, res);
  }
  
  static async updateOldTrip({ body }, res) {
    const [response] = await updateTrip(body);
    return HelperUtils.serverResponse(response, res, 200, 'Trip', 'updated');
  }
}

export default tripController;
