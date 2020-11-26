import { Post } from "../../models";
import Response from "../response";

export default class PostResponse extends Response {

  createdAt: number;
  type: string;
  title: string;
  body: string;
  url: string;

  constructor(model: Post) {
    super(model.id);
    this.createdAt = model.createdAt.getTime();
    this.type = model.type;
    this.title = model.title;
    this.body = model.body;
    this.url = model.url;
  }

  static create(model: Post) {
    return new PostResponse(model);
  }

  static async get(postId: number) {
    const post = await Post.findByPk(postId);
    if (post == null) return null;
    return PostResponse.create(post);
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