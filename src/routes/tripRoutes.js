import tripController from '../controllers/tripController';
import Authenticate from '../middleware/authenticator';
import ValidateData from '../middleware/validateInputData';

export default (server) => {
  server.route('/api/v1/trips')
    .get(Authenticate.verifyToken, tripController.fetchAllTrips)
    .post(
      Authenticate.verifyToken,
      Authenticate.isAdmin,
      ValidateData.validateTripData,
      tripController.createNewTrip,
    );
  
  server.route('/api/v1/trips/:tripId')
    .get(Authenticate.verifyToken, tripController.fetchSingleTrip);
};
