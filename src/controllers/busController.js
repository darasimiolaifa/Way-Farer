import busModel from '../models/busModel';
import HelperUtils from '../helperUtils/helperUtils';

const { createBus } = busModel;

class busController {
  static async createNewBus({ body }, res) {
    const [response] = await createBus(body);
    console.log(response);
    return HelperUtils.serverResponse(response, res, 201);
  }
}

export default busController;
