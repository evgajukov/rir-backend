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
const response_1 = require("../response");
const models_1 = require("../../models");
class UserResponse extends response_1.default {
    constructor(model) {
        super(model.id);
        this.mobile = model.mobile;
        this.banned = model.banned;
    }
    static create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return new UserResponse(model);
        });
    }
    static info(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findByPk(userId);
            if (user == null)
                return null;
            const userInfo = yield UserResponse.create(user);
            console.log(`UserResponse.info result: ${JSON.stringify(userInfo)}`);
            return userInfo;
        });
    }
    static seed(action, params, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (socket.authToken == null)
                return null;
            return yield UserResponse.info(socket.authToken.id);
        });
    }
}
exports.default = UserResponse;
