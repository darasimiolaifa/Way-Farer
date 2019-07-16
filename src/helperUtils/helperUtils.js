import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel';

const { getSingleUser } = userModel;

class HelperUtils {
  static validate() {
    return {
      name: /^[a-zA-Z]+$/,
      email: /^(\w+)([._-]?)(\w+)@([A-z0-9-_.]+)\.([A-z]{2,3})$/,
      integer: /^[0-9]+$/,
      date: /^([0-9]{1,2})([/\-.]{1})([0-9]{1,2})([/\-.]{1})([0-9]{4})$/,
      string: /^(\w+)([-_.&]*\s*\w+)?$/,
      float: /^([0-9]+)\.([0-9]{2})$/,
      emptyBody: {
        test(requestBody) {
          return Object.entries(requestBody).length <= 1;
        },
      },
      year: {
        test(year) {
          const yearInteger = Number(year);
          const currentYear = new Date().getFullYear;
          // eslint-disable-next-line no-restricted-globals
          return !isNaN(yearInteger) && (!(yearInteger < 0) && !(yearInteger > currentYear));
        },
      },
    };
  }
  
  static async validateAuthDetails({ email, password }, errors = []) {
    try {
      const rows = await getSingleUser('email', email);
      if (!rows.length > 0) {
        errors.push('The user with the email does not exist in our records.');
      } else {
        const [user] = rows;
        if (!await bcrypt.compare(password, user.password)) {
          errors.push('Incorrect password for this account');
        }
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  
  static generateToken(user) {
    return JWT.sign({
      iss: 'Way-Farer',
      sub: user,
    }, process.env.APP_SECRET);
  }
  
  static transformToCamelCase(theString) {
    const splittedString = theString.split('_');
    const camelCasedArray = splittedString.map((element, index) => {
      if (index === 0) return element;
      return element[0].toUpperCase() + element.slice(1);
    });
    
    return camelCasedArray.join('');
  }
  
  static buildUpdateData(model, resource, body, res, next) {
    if (!model) return res.status(404).send({ status: 404, error: `${resource} does not exist.` });
    const fields = Object.keys(model);
    fields.forEach((element) => {
      const field = HelperUtils.transformToCamelCase(element);
      body[field] = body[field] ? body[field] : model[element];
    });
    
    return next();
  }
  
  static serverResponse(response, res, status = 200, route, action) {
    let reply;
    if (response.name && response.name === 'error') {
      reply = { status: 500, error: 'There was a problem fulfilling your request. Please try again later.' };
    } else if (response.length === 0) {
      reply = { status: 404, error: `There are no ${route} in our records at the moment.` };
    } else if (Object.entries(response).length === 0) {
      reply = { status: 404, error: `There is no such ${route.toLowerCase()} in our records.` };
    } else if (action) reply = { status, data: { message: `${route} ${action} successfully.` } };
    else reply = { status, data: response };
    
    return res.status(reply.status).send({ ...reply });
  }
}

export default HelperUtils;
