/* eslint-disable no-param-reassign */
import userModel from '../models/userModel';
import busModel from '../models/busModel';
import HelperUtils from '../helperUtils/helperUtils';

class BuildUpdateData {
  static async userData({ params, body }, res, next) {
    const { getSingleUser } = userModel;
    const [user] = await getSingleUser('user_id', params.userId);
    return HelperUtils.buildUpdateData(user, body, res, next);
  }
  
  static async busData({ params, body }, res, next) {
    const { getSingleBus } = busModel;
    const [bus] = await getSingleBus(params);
    return HelperUtils.buildUpdateData(bus, body, res, next);
  }
}

export default BuildUpdateData;
