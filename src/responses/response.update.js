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
const _1 = require(".");
const models_1 = require("../models");
class ResponseUpdate {
    constructor(exchange) {
        this.exchange = exchange;
    }
    update(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                eventData.createAt = new Date(eventData.createAt).getTime();
                eventData.data = eventData.data != null ? JSON.parse(eventData.data) : null;
                switch (eventData.type) {
                    case "USER.UPDATE":
                        yield this.updateUser(eventData);
                        break;
                    case "POST.SAVE":
                        yield this.updatePostSave(eventData);
                        break;
                    case "INVITE.SAVE":
                        yield this.updateInviteSave(eventData);
                        break;
                    case "VOTE.SAVE":
                        yield this.updateVoteSave(eventData);
                        break;
                    case "VOTE.ANSWER.SAVE":
                        yield this.updateVoteAnswerSave(eventData);
                        break;
                    case "IM.SAVE":
                    case "IM.SHOWN":
                        yield this.updateIMMessage(eventData);
                        yield this.updateIMCategory(eventData);
                        break;
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    updateUser(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield _1.UserResponse.info(eventData.userId);
            yield this.publish(`user.${eventData.userId}`, data, "update");
        });
    }
    updatePostSave(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield _1.PostResponse.get(eventData.data.postId);
            yield this.publish("posts", post, eventData.data.event);
        });
    }
    updateInviteSave(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const invite = yield _1.InviteResponse.get(eventData.data.inviteId);
            yield this.publish(`invites.${eventData.userId}`, invite, eventData.data.event);
        });
    }
    updateVoteSave(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const vote = yield _1.VoteResponse.get(eventData.data.voteId);
            // нужно обновить каналы всех пользователей, кому доступно голосование
            const votePersons = yield models_1.VotePerson.findAll({
                where: { voteId: eventData.data.voteId },
                include: [{ model: models_1.Person }]
            });
            for (let votePerson of votePersons) {
                yield this.publish(`votes.${votePerson.person.userId}`, vote, eventData.data.event);
            }
        });
    }
    updateVoteAnswerSave(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const vote = yield _1.VoteResponse.get(eventData.data.voteId);
            // нужно обновить каналы всех пользователей, кому доступно голосование
            const votePersons = yield models_1.VotePerson.findAll({
                where: { voteId: eventData.data.voteId },
                include: [{ model: models_1.Person }]
            });
            for (let votePerson of votePersons) {
                yield this.publish(`votes.${votePerson.person.userId}`, vote, eventData.data.event);
            }
        });
    }
    updateIMMessage(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield _1.IMMessageResponse.get(eventData.data.messageId);
            // нужно обновить каналы всех пользователей этого чата
            const channelPersons = yield models_1.IMChannelPerson.findAll({ where: { channelId: message.channel.id }, include: [{ model: models_1.Person }] });
            for (let channelPerson of channelPersons) {
                yield this.publish(`imMessages.${channelPerson.channelId}.${channelPerson.person.userId}`, message, eventData.data.event);
            }
        });
    }
    updateIMCategory(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield _1.IMChannelResponse.get(eventData.data.channelId);
            // нужно обновить каналы всех пользователей этого чата
            const channelPersons = yield models_1.IMChannelPerson.findAll({ where: { channelId: channel.id }, include: [{ model: models_1.Person }] });
            for (let channelPerson of channelPersons) {
                yield this.publish(`imChannels.${channelPerson.person.userId}`, channel, eventData.data.event);
            }
        });
    }
    /**
     * Отправка данных в канал
     * @param channel название канала
     * @param rows массив или единичные данные с обновлениями для отправки
     * @param event тип обновления канала: create, update, destroy
     */
    publish(channel, rows, event = "update") {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`publishUpdateData to CHANNEL: ${channel}, event = ${event}`);
            if (rows != null) {
                if (rows instanceof Array) {
                    for (let data of rows) {
                        yield this.exchange.publish(channel, { event, data });
                    }
                }
                else {
                    let data = rows;
                    yield this.exchange.publish(channel, { event, data });
                }
            }
            yield this.exchange.publish(channel, { event: "ready" });
        });
    }
}
exports.default = ResponseUpdate;
