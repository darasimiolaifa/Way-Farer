import bookingController from '../controllers/bookingController';
import Authenticate from '../middleware/authenticator';
import ValidateData from '../middleware/validateInputData';
import LogicalConstraints from '../middleware/checkLogicalConstraints';
import BuildUpdateData from '../middleware/buildUpdateData';

export default (server) => {
  server.route('/api/v1/bookings')
    .get(Authenticate.verifyToken, bookingController.fetchAllBookings)
    .post(
      Authenticate.verifyToken,
      ValidateData.validateBookingData,
      LogicalConstraints.checkDaysLeft,
      LogicalConstraints.checkSeatsLeft,
      LogicalConstraints.checkSeatNumberAvailability,
      bookingController.createNewBooking,
    );
    
  server.route('/api/v1/bookings/:bookingId')
    .get(Authenticate.verifyToken, bookingController.fetchSingleBooking)
    .patch(
      Authenticate.verifyToken,
      Authenticate.verifyOwnership,
      BuildUpdateData.bookingData,
      ValidateData.validateBookingData,
      LogicalConstraints.checkDaysLeft,
      LogicalConstraints.checkSeatsLeft,
      LogicalConstraints.checkSeatNumberAvailability,
      bookingController.updateOldBooking,
    );
};
