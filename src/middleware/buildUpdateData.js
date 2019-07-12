/* eslint-disable no-param-reassign */
import userModel from '../models/userModel';
import HelperUtils from '../helperUtils/helperUtils';

class BuildUpdateData {
  static async userData({ params, body }, res, next) {
    const { getSingleUser } = userModel;
    const [user] = await getSingleUser('user_id', params.userId);
    return HelperUtils.buildUpdateData(user, body, res, next);
  }
}

export default BuildUpdateData;
