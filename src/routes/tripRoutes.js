import tripController from '../controllers/tripController';
import Authenticate from '../middleware/authenticator';
import ValidateData from '../middleware/validateInputData';
import BuildUpdateData from '../middleware/buildUpdateData';

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
    .get(Authenticate.verifyToken, tripController.fetchSingleTrip)
    .patch(Authenticate.verifyToken, Authenticate.isAdmin, tripController.updateOldTripStatus)
    .delete(Authenticate.verifyToken, Authenticate.isAdmin, tripController.deleteOldTrip);
    
  server.route('/api/v1/trips/:tripId/edit')
    .patch(
      Authenticate.verifyToken,
      Authenticate.isAdmin,
      BuildUpdateData.tripData,
      ValidateData.validateTripData,
      tripController.updateOldTrip,
    );
};
