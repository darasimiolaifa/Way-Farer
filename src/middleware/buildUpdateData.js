/* eslint-disable no-param-reassign */
import userModel from '../models/userModel';
import busModel from '../models/busModel';
import tripModel from '../models/tripModel';
import HelperUtils from '../helperUtils/helperUtils';

class BuildUpdateData {
  static async userData({ params, body }, res, next) {
    const { getSingleUser } = userModel;
    const [user] = await getSingleUser('user_id', params.userId);
    return HelperUtils.buildUpdateData(user, 'User', body, res, next);
  }
  
  static async busData({ params, body }, res, next) {
    const { getSingleBus } = busModel;
    const [bus] = await getSingleBus(params);
    return HelperUtils.buildUpdateData(bus, 'Bus', body, res, next);
  }
  
  static async tripData({ params, body }, res, next) {
    const { getSingleTrip } = tripModel;
    const [trip] = await getSingleTrip(params);
    return HelperUtils.buildUpdateData(trip, 'Trip', body, res, next);
  }
}

export default BuildUpdateData;
