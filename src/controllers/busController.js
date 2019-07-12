import busModel from '../models/busModel';
import HelperUtils from '../helperUtils/helperUtils';

const { createBus, getAllBuses } = busModel;

class busController {
  static async createNewBus({ body }, res) {
    const [response] = await createBus(body);
    return HelperUtils.serverResponse(response, res, 201);
  }
  
  static async fetchAllBuses(req, res) {
    const response = await getAllBuses();
    return HelperUtils.serverResponse(response, res, 200, 'buses');
  }
}

export default busController;
