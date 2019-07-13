import tripController from '../controllers/tripController';
import Authenticate from '../middleware/authenticator';
import ValidateData from '../middleware/validateInputData';

export default (server) => {
  server.route('/api/v1/trips')
    .post(
      Authenticate.verifyToken,
      Authenticate.isAdmin,
      ValidateData.validateTripData,
      tripController.createNewTrip,
    );
};
