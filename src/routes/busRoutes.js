import busController from '../controllers/busController';
import Authenticate from '../middleware/authenticator';
import ValidateData from '../middleware/validateInputData';

export default (server) => {
  server.route('/api/v1/buses')
    .post(
      Authenticate.verifyToken,
      Authenticate.isAdmin,
      ValidateData.validateBusData,
      busController.createNewBus,
    );
};
