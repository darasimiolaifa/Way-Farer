import busModel from '../models/busModel';
import HelperUtils from '../helperUtils/helperUtils';

const {
  createBus,
  getAllBuses,
  getSingleBus,
  updateBus,
  deleteBus,
} = busModel;

class busController {
  static async createNewBus({ body }, res) {
    const [response] = await createBus(body);
    return HelperUtils.serverResponse(response, res, 201);
  }
  
  static async fetchAllBuses(req, res) {
    const response = await getAllBuses();
    return HelperUtils.serverResponse(response, res, 200, 'buses');
  }
  
  static async fetchSingleBus({ params }, res) {
    const response = await getSingleBus(params);
    return HelperUtils.serverResponse(response, res);
  }
  
  static async updateOldBus({ body }, res) {
    const [response] = await updateBus(body);
    return HelperUtils.serverResponse(response, res, 200, 'Bus', 'updated');
  }
  
  static async deleteOldBus({ params }, res) {
    const [response] = await deleteBus(params);
    return HelperUtils.serverResponse(response, res, 200, 'Bus', 'deleted');
  }
}

export default busController;
