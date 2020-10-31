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
exports.logout = exports.auth = void 0;
const models_1 = require("../models");
const numeral = require("numeral");
const smsc_1 = require("../lib/smsc");
const errors_1 = require("./errors");
function auth({ mobile, code }, respond) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(">>>>> actions/user.auth");
        try {
            let user = yield models_1.User.findOne({ where: { mobile } });
            if (user == null) {
                // не нашли пользователя по номеру телефона, заводим нового пользователя
                user = yield models_1.User.create({ mobile });
            }
            if (user.banned)
                throw new Error(errors_1.default.user["002"].code);
            if (code == null) {
                // формируем и отправляем одноразовый код авторизации по смс
                user.smsCode = generateAuthCode();
                yield user.save();
                yield smsc_1.default.send([mobile], user.smsCode);
                respond(null, { status: "OK" });
            }
            else {
                // проверяем, что код авторизации совпадает с присланным
                if (user.smsCode != code)
                    throw new Error(errors_1.default.user["001"].code);
                // все хорошо
                const token = yield newToken(user);
                this.setAuthToken(token);
                respond(null, token);
            }
        }
        catch (error) {
            console.error(error);
            respond(errors_1.default.methods.check(errors_1.default, error.message));
        }
    });
}
exports.auth = auth;
function logout(params, respond) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(">>>>> actions/user.logout");
        try {
            if (!this.authToken)
                throw new Error(errors_1.default.user["004"].code);
            this.deauthenticate();
            respond(null, true);
        }
        catch (error) {
            console.error(error);
            respond(errors_1.default.methods.check(errors_1.default, error.message));
        }
    });
}
exports.logout = logout;
function generateAuthCode() {
    return numeral(9999 * Math.random()).format("0000");
}
function newToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const person = yield models_1.Person.findOne({ where: { userId: user.id } });
        const role = yield models_1.Role.findByPk(user.roleId);
        const token = {
            id: user.id,
            mobile: user.mobile,
            banned: user.banned,
            role,
            person,
        };
        console.log(`actions/user.newToken: ${JSON.stringify(token)}`);
        return token;
    });
}
