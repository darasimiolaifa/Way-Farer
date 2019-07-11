import AuthController from '../controllers/authController';
import AuthValidation from '../middleware/validateAuthData';

export default (server) => {
  server.route('/api/v1/auth/signup')
    .post(AuthValidation.signup, AuthController.signup);
    
  server.route('/api/v1/auth/signin')
    .post(AuthValidation.signin, AuthController.signin);
};
