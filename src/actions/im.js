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
exports.shown = exports.save = void 0;
const models_1 = require("../models");
const response_update_1 = require("../responses/response.update");
const errors_1 = require("./errors");
function save({ channelId, body }, respond) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(">>>>> actions/im.save");
        try {
            if (!this.authToken)
                throw new Error(errors_1.default.user["004"].code);
            const person = yield models_1.Person.findOne({ where: { userId: this.authToken.id } });
            const channelPerson = yield models_1.IMChannelPerson.findOne({ where: { channelId, personId: person.id } });
            if (channelPerson == null)
                throw new Error(errors_1.default.im["001"].code);
            const message = yield models_1.IMMessage.create({ personId: person.id, channelId, body });
            yield models_1.IMMessageShow.create({ personId: person.id, messageId: message.id });
            // обновляем канал с группами чатов и конкретную группу
            const responseUpdate = new response_update_1.default(this.exchange);
            yield responseUpdate.update({
                userId: this.authToken.id,
                createAt: new Date(),
                type: "IM.SAVE",
                status: "SUCCESS",
                data: JSON.stringify({ channelId, messageId: message.id, event: "create" })
            });
            respond(null, { status: "OK" });
        }
        catch (error) {
            console.error(error);
            respond(errors_1.default.methods.check(errors_1.default, error.message));
        }
    });
}
exports.save = save;
function shown({ messageId }, respond) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(">>>>> actions/im.shown");
        try {
            if (!this.authToken)
                throw new Error(errors_1.default.user["004"].code);
            const person = yield models_1.Person.findOne({ where: { userId: this.authToken.id } });
            const message = yield models_1.IMMessage.findByPk(messageId);
            if (message == null)
                throw new Error(errors_1.default.im["002"].code);
            yield models_1.IMMessageShow.create({ personId: person.id, messageId });
            // обновляем канал с группами чатов и конкретную группу
            const responseUpdate = new response_update_1.default(this.exchange);
            yield responseUpdate.update({
                userId: this.authToken.id,
                createAt: new Date(),
                type: "IM.SHOWN",
                status: "SUCCESS",
                data: JSON.stringify({ channelId: message.channelId, messageId, event: "create" })
            });
            respond(null, { status: "OK" });
        }
        catch (error) {
            console.error(error);
            respond(errors_1.default.methods.check(errors_1.default, error.message));
        }
    });
}
exports.shown = shown;
