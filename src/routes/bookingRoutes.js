import bookingController from '../controllers/bookingController';
import Authenticate from '../middleware/authenticator';
import ValidateData from '../middleware/validateInputData';
import LogicalConstraints from '../middleware/checkLogicalConstraints';

export default (server) => {
  server.route('/api/v1/bookings')
    .post(
      Authenticate.verifyToken,
      ValidateData.validateBookingData,
      LogicalConstraints.checkDaysLeft,
      LogicalConstraints.checkSeatsLeft,
      bookingController.createNewBooking,
    );
};
