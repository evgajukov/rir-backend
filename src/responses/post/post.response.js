"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const response_1 = require("../response");
class PostResponse extends response_1.default {
    constructor(model) {
        super(model.id);
        this.createdAt = model.createdAt.getTime();
        this.type = model.type;
        this.title = model.title;
        this.body = model.body;
        this.url = model.url;
    }
    static create(model) {
        return new PostResponse(model);
    }
    static get(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield models_1.Post.findByPk(postId);
            if (post == null)
                return null;
            return PostResponse.create(post);
        });
    }
    static list(filter = "unpinned") {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {};
            if (filter == "unpinned")
                where = { pin: false };
            else if (filter == "pinned")
                where = { pin: true };
            const posts = yield models_1.Post.findAll({ where, order: [["id", "desc"]] });
            if (posts == null || posts.length == 0)
                return [];
            return posts.map(post => PostResponse.create(post));
        });
    }
    static seed(action, params, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (action == "LIST")
                return yield PostResponse.list();
            if (action == "PINNED")
                return yield PostResponse.list("pinned");
        });
    }
}
exports.default = PostResponse;
