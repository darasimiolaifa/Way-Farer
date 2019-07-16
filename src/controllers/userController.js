import userModel from '../models/userModel';
import HelperUtils from '../helperUtils/helperUtils';

const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = userModel;

class userController {
  static async fetchAllUsers(req, res) {
    const response = await getAllUsers();
    return HelperUtils.serverResponse(response, res, 200, 'users');
  }
  
  static async fetchSingleUser({ params }, res) {
    const [response] = await getSingleUser('user_id', params.user_id, false);
    return HelperUtils.serverResponse(response, res);
  }
  
  static async updateOldUser({ body, params }, res) {
    const response = await updateUser(body, params);
    return HelperUtils.serverResponse(response, res, 200, 'User profile', 'updated');
  }
  
  static async deleteOldUser({ params }, res) {
    const response = await deleteUser(params);
    return HelperUtils.serverResponse(response, res, 200, 'User', 'deleted');
  }
}

export default userController;
