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
exports.saveProfile = exports.invite = exports.logout = exports.auth = void 0;
const models_1 = require("../models");
const numeral = require("numeral");
const smsc_1 = require("../lib/smsc");
const errors_1 = require("./errors");
function auth({ mobile, invite, code }, respond) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(">>>>> actions/user.auth");
        try {
            let user = yield models_1.User.findOne({ where: { mobile } });
            if (user == null) {
                if (invite == null) {
                    throw new Error(errors_1.default.user["003"].code);
                }
                else {
                    // проверяем корректность кода приглашения и, если все хорошо, то регистрируем нового пользователя
                    let inviteDb = yield models_1.Invite.findOne({ where: { code: invite, used: false } });
                    if (inviteDb == null)
                        throw new Error(errors_1.default.invite["001"].code);
                    user = yield models_1.User.create({ mobile, roleId: 2 }); // 2 - USER
                    inviteDb.used = true;
                    inviteDb.newUserId = user.id;
                    yield inviteDb.save();
                }
            }
            else {
                if (invite != null)
                    throw new Error(errors_1.default.invite["002"].code);
            }
            if (user.banned)
                throw new Error(errors_1.default.user["002"].code);
            if (code == null) {
                // формируем и отправляем одноразовый код авторизации по смс
                user.smsCode = generateCode(4);
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
function invite(params, respond) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(">>>>> actions/user.invite");
        try {
            if (!this.authToken)
                throw new Error(errors_1.default.user["004"].code);
            let code = null;
            let inviteDb = null;
            do {
                code = generateCode(6);
                inviteDb = yield models_1.Invite.findOne({ where: { code } });
            } while (inviteDb != null);
            inviteDb = yield models_1.Invite.create({ userId: this.authToken.id, code });
            respond(null, { id: inviteDb.id, code });
        }
        catch (error) {
            console.error(error);
            respond(errors_1.default.methods.check(errors_1.default, error.message));
        }
    });
}
exports.invite = invite;
function saveProfile({ surname, name, midname, flat }, respond) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(">>>>> actions/user.saveProfile");
        try {
            if (!this.authToken)
                throw new Error(errors_1.default.user["004"].code);
            let person = yield models_1.Person.findOne({ where: { userId: this.authToken.id } });
            if (person == null) {
                // только что зарегистрировались и еще нет профиля
                person = yield models_1.Person.create({ userId: this.authToken.id, surname, name, midname });
                yield models_1.Resident.create({ personId: person.id, flatId: flat });
                // генерируем новость, что у нас новый сосед
                const flatDb = yield models_1.Flat.findByPk(flat);
                yield models_1.Post.create({ title: "Новый сосед", body: `К нам присоединился новый сосед с кв. №${flatDb.number}, этаж ${flatDb.floor}, подъезд ${flatDb.section}` });
            }
            else {
                // обновляем только данные по персоне, изменения по квартире пока игнорируем
                person.surname = surname;
                person.name = name;
                person.midname = midname;
                yield person.save();
            }
            const resident = yield models_1.Resident.findOne({ where: { personId: person.id }, include: [{ model: models_1.Flat }] });
            respond(null, { status: "OK", person, resident });
        }
        catch (error) {
            console.error(error);
            respond(errors_1.default.methods.check(errors_1.default, error.message));
        }
    });
}
exports.saveProfile = saveProfile;
function generateCode(len) {
    return numeral(parseInt("9".repeat(len)) * Math.random()).format("0".repeat(len));
}
function newToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const person = yield models_1.Person.findOne({ where: { userId: user.id } });
        const role = yield models_1.Role.findByPk(user.roleId);
        let resident = null;
        if (person != null)
            resident = yield models_1.Resident.findOne({ where: { personId: person.id }, include: [{ model: models_1.Flat }] });
        const token = {
            id: user.id,
            mobile: user.mobile,
            banned: user.banned,
            role: { id: role.id, name: role.name },
            person,
            resident
        };
        console.log(`actions/user.newToken: ${JSON.stringify(token)}`);
        return token;
    });
}
