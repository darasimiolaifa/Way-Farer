/* eslint-disable no-param-reassign */
import JWT from 'jsonwebtoken';
import userModel from '../models/userModel';
import bookingModel from '../models/bookingModel';

const { getSingleUser } = userModel;
const { getSingleBooking } = bookingModel;

class Authenticate {
  static async verifyToken({ headers, body }, res, next) {
    const token = headers['x-access-token'];
    if (!token || token === '') {
      return res.status(400).send({ status: 400, error: 'Please provide a token.' });
    }
    try {
      const { sub } = await JWT.verify(token, process.env.APP_SECRET);
      const { email } = sub;
      const [user] = await getSingleUser('email', email);
      if (!user) {
        return res.status(400).send({ status: 400, error: 'Please provide a valid token.' });
      }
      body.user = { ...user };
      return next();
    } catch (error) {
      throw new Error(error);
    }
  }
  
  static isAdmin({ body }, res, next) {
    const { user } = body;
    if (!user.is_admin) {
      return res.status(401).send({ status: 401, error: 'Only Admin can perform this operation.' });
    }
    return next();
  }
  
  static async verifyOwnership({ body, url, params }, res, next) {
    let method;
    let args;
    const { user } = body;
    if (url.includes('users')) {
      method = getSingleUser;
      args = ['user_id', params.userId, false];
    } else if (url.includes('bookings')) {
      method = getSingleBooking;
      args = params.bookingId.match(/[0-9]+,[0-9]+/)[0].split(',');
    }
    const [resource] = await method(...args);
    if (resource && (resource.user_id !== user.user_id && !user.is_admin)) {
      return res.status(403).send({ satatus: 403, error: 'You do not have permission to access this resource.' });
    }
    return next();
  }
}

export default Authenticate;
