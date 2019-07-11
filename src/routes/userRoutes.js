import userController from '../controllers/userController';
import Authenticate from '../middleware/authenticator';

export default (server) => {
  server.route('/api/v1/users/:user_id')
    .get(
      Authenticate.verifyToken,
      Authenticate.verifyOwnership,
      userController.fetchSingleUser,
    );
};
