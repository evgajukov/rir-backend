import { DepartmentResponse, InviteResponse, PostResponse } from "..";
import Response from "../response";

export default class AllResponse extends Response {

  posts: PostResponse[];
  departments: DepartmentResponse[];
  invites: InviteResponse[];

  constructor() {
    super();
  }

  static create() {
    return new AllResponse();
  }

  static async init(userId: number, channelName?: string) {
    let posts: PostResponse[] = [];
    let departments: DepartmentResponse[] = [];
    let invites: InviteResponse[] = [];

    if (channelName == null || channelName == "posts") posts = await PostResponse.list();
    if (channelName == null || channelName == "departments") departments = await DepartmentResponse.list(userId);
    if (channelName == null || channelName == "invites") invites = await InviteResponse.list(userId);

    let result = AllResponse.create();
    result.posts = posts;
    result.departments = departments;
    result.invites = invites;
    return result;
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return null;
    return await AllResponse.init(socket.authToken.id, params == null || params.length == 0 ? null : params);
  }
}