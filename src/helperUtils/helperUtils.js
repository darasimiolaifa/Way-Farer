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
}

export default HelperUtils;
