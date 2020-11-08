import { Post } from "../../models";
import Response from "../response";

export default class PostResponse extends Response {

  createdAt: number;
  title: string;
  body: string;

  constructor(model: Post) {
    super(model.id);
    this.createdAt = model.createdAt.getTime();
    this.title = model.title;
    this.body = model.body;
  }

  static create(model: Post) {
    return new PostResponse(model);
  }

  static async list() {
    const posts = await Post.findAll({ order: [["id", "desc"]] });
    if (posts == null || posts.length == 0) return [];
    return posts.map(post => PostResponse.create(post));
  }

  static async seed(action, params, socket) {
    return await PostResponse.list();
  }
}