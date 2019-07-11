/* eslint-disable no-param-reassign */
import validator from '../helperUtils/validator';
import HelperUtils from '../helperUtils/helperUtils';

class AuthValidationClass {
  static async signup({ body }, res, next) {
    const fields = ['firstName', 'lastName', 'email', 'password'];
    const errors = [];
    
    fields.forEach(element => validator(element, body, errors));
    
    if (await HelperUtils.validateAuthDetails(body)) errors.push('This email is no longer available. Please pick another.');
    
    if (errors.length > 0) {
      return res.status(400).send({ status: 400, errors });
    }
    return next();
  }
  
  static async signin({ body }, res, next) {
    const fields = ['email', 'password'];
    const errors = [];
    
    fields.forEach(element => validator(element, body, errors));
    const user = await HelperUtils.validateAuthDetails(body, errors);
    
    if (errors.length > 0) {
      return res.status(401).send({ status: 401, errors });
    }
    body.user = { ...user };
    return next();
  }
}

export default AuthValidationClass;
