/* eslint-disable no-param-reassign */
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel';

const { getSingleUser } = userModel;

class HelperUtils {
  static validate() {
    return {
      name: /^[a-zA-Z]+$/,
      email: /^(\w+)([._-]?)(\w+)@([A-z0-9-_.]+)\.([A-z]{2,3})$/,
      emptyBody: {
        test(requestBody) {
          return Object.entries(requestBody).length <= 1;
        },
      },
    };
  }
  
  // eslint-disable-next-line consistent-return
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
  
  static authServerResponse(error, code, res) {
    if (error.length > 0) return res.status(code).send({ code, error });
    return 1;
  }
}

export default HelperUtils;
