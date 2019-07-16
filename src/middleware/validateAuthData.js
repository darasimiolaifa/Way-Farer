import validator from '../helperUtils/validator';
import HelperUtils from '../helperUtils/helperUtils';

class AuthValidationClass {
  static async signup({ body }, res, next) {
    const fields = ['first_name', 'last_name', 'email', 'password'];
    const error = [];
    
    fields.forEach(element => validator(element, body, error));
    
    if (await HelperUtils.validateAuthDetails(body)) error.push('This email is no longer available. Please pick another.');
    
    if (error.length > 0) {
      return res.status(400).send({ status: 400, error });
    }
    return next();
  }
  
  static async signin({ body }, res, next) {
    const fields = ['email', 'password'];
    const error = [];
    
    fields.forEach(element => validator(element, body, error));
    const user = await HelperUtils.validateAuthDetails(body, error);
    
    if (error.length > 0) {
      return res.status(401).send({ status: 401, error });
    }
    body.user = { ...user };
    return next();
  }
}

export default AuthValidationClass;
