import bcrypt from 'bcryptjs';
import userModel from '../models/userModel';
import HelperUtils from '../helperUtils/helperUtils';

const { createUser } = userModel;

class authController {
  static async signup({ body }, res) {
    body.password = await bcrypt.hash(body.password, await bcrypt.genSalt());
    const response = await createUser(body);
    if (response.name && response.name === 'error') {
      return res.status(500).send({ status: 500, error: 'Your account could not be created at the moment. Please try again later.' });
    }
    const [user] = response;
    const token = HelperUtils.generateToken(user);
    return res.status(201).send({ status: 201, data: { token, ...user } });
  }
  
  static signin({ body }, res) {
    const { user } = body;
    const token = HelperUtils.generateToken(user);
    return res.status(200).send({ status: 200, data: { token, ...user } });
  }
}

export default authController;
