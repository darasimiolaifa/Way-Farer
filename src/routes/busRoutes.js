import busController from '../controllers/busController';
import Authenticate from '../middleware/authenticator';
import ValidateData from '../middleware/validateInputData';

export default (server) => {
  server.route('/api/v1/buses')
    .get(Authenticate.verifyToken, Authenticate.isAdmin, busController.fetchAllBuses)
    .post(
      Authenticate.verifyToken,
      Authenticate.isAdmin,
      ValidateData.validateBusData,
      busController.createNewBus,
    );
    
  server.route('/api/v1/buses/:busId')
    .get(Authenticate.verifyToken, Authenticate.isAdmin, busController.fetchSingleBus);
};
