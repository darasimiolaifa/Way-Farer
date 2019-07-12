import userController from '../controllers/userController';
import Authenticate from '../middleware/authenticator';

export default (server) => {
  server.route('/api/v1/users/:userId')
    .get(
      Authenticate.verifyToken,
      Authenticate.verifyOwnership,
      userController.fetchSingleUser,
    ).delete(
      Authenticate.verifyToken,
      Authenticate.isAdmin,
      userController.deleteOldUser,
    );
};
