import userModel from '../models/userModel';
import HelperUtils from '../helperUtils/helperUtils';

const { getSingleUser } = userModel;

class userController {
  static async fetchSingleUser({ params }, res) {
    const [response] = await getSingleUser('user_id', params.user_id, false);
    return HelperUtils.serverResponse(response, res);
  }
}

export default userController;
