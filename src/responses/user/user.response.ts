import Response from "../response";
import { User } from "../../models";

export default class UserResponse extends Response {

  mobile: string;
  banned: boolean;
  
  constructor(model: User) {
    super(model.id);
    this.mobile = model.mobile;
    this.banned = model.banned;
  }

  static async create(model: User) {
    return new UserResponse(model);
  }

  static async info(userId: number) {
    const user = await User.findByPk(userId);
    if (user == null) return null;
    const userInfo = await UserResponse.create(user);
    console.log(`UserResponse.info result: ${JSON.stringify(userInfo)}`);
    return userInfo;
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return null;
    return await UserResponse.info(socket.authToken.id);
  }
}