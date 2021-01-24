import { WhereOptions } from "sequelize/types";
import { Post } from "../../models";
import Response from "../response";

type tPostFilter = "all" | "pinned" | "unpinned";

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

  static async list(filter: tPostFilter = "unpinned") {
    let where: WhereOptions = {};
    if (filter == "unpinned") where = { pin: false };
    else if (filter == "pinned") where = { pin: true };
    const posts = await Post.findAll({ where, order: [["id", "desc"]] });
    if (posts == null || posts.length == 0) return [];
    return posts.map(post => PostResponse.create(post));
  }

  static async seed(action, params, socket) {
    if (action == "LIST") return await PostResponse.list();
    if (action == "PINNED") return await PostResponse.list("pinned");
  }
}