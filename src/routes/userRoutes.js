import userController from '../controllers/userController';
import Authenticate from '../middleware/authenticator';
import BuildUpdateData from '../middleware/buildUpdateData';

export default (server) => {
  server.route('/api/v1/users')
    .get(Authenticate.verifyToken, Authenticate.isAdmin, userController.fetchAllUsers);
    
  server.route('/api/v1/users/:user_id')
    .get(
      Authenticate.verifyToken,
      userController.fetchSingleUser,
    ).patch(
      Authenticate.verifyToken,
      BuildUpdateData.userData,
      userController.updateOldUser,
    ).delete(
      Authenticate.verifyToken,
      Authenticate.isAdmin,
      userController.deleteOldUser,
    );
};
