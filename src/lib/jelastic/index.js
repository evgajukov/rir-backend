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
const http_utilities_1 = require("../../utilities/http_utilities");
class JelasticAPI {
    constructor(login, password) {
        this.API_URL = "https://app.jelastic.regruhosting.ru/1.0/#BLOCK#/rest/#METHOD#";
        this.BLOCK_AUTH = "users/authentication";
        this.BLOCK_ENV = "environment/control";
        this.METHOD_SIGNIN = "signin";
        this.METHOD_ENV_START = "startenv";
        this.METHOD_ENV_STOP = "stopenv";
        this.METHOD_ENV_RESTART = "restartnodebyid";
        this.SYS_APPID = "1dd8d191d38fff45e62564fcf67fdcd6";
        this.LOGIN = "evgajukov@gmail.com";
        this.PASSOWRD = "txgZYt25lU";
        this.login = login != null ? login : this.LOGIN;
        this.password = password != null ? password : this.PASSOWRD;
    }
    signin() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.API_URL.replace("#BLOCK#", this.BLOCK_AUTH).replace("#METHOD#", this.METHOD_SIGNIN);
            const data = {
                appid: this.SYS_APPID,
                login: this.login,
                password: this.password
            };
            const result = yield http_utilities_1.default.postContent(url, data, "form");
            const json = JSON.parse(result);
            this.session = json.session;
        });
    }
    start(envName) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.API_URL.replace("#BLOCK#", this.BLOCK_ENV).replace("#METHOD#", this.METHOD_ENV_START);
            yield this.signin();
            const data = {
                envName,
                session: this.session
            };
            yield http_utilities_1.default.postContent(url, data, "form");
        });
    }
    stop(envName) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.API_URL.replace("#BLOCK#", this.BLOCK_ENV).replace("#METHOD#", this.METHOD_ENV_STOP);
            yield this.signin();
            const data = {
                envName,
                session: this.session
            };
            yield http_utilities_1.default.postContent(url, data, "form");
        });
    }
    restart(envName, nodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.API_URL.replace("#BLOCK#", this.BLOCK_ENV).replace("#METHOD#", this.METHOD_ENV_RESTART);
            yield this.signin();
            const data = {
                envName,
                nodeId,
                session: this.session
            };
            yield http_utilities_1.default.postContent(url, data, "form");
        });
    }
}
exports.default = JelasticAPI;
