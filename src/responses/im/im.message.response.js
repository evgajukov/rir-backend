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
const cache_1 = require("../../lib/cache");
const models_1 = require("../../models");
const response_1 = require("../response");
const im_person_type_1 = require("../type/im.person.type");
class IMMessageResponse extends response_1.default {
    constructor(model) {
        super(model.id);
        this.createdAt = model.createdAt.getTime();
        this.updatedAt = model.updatedAt.getTime();
        if (model.personId != null)
            this.person = im_person_type_1.getPerson(model.person);
        this.channel = {
            id: model.channel.id,
            title: model.channel.title
        };
        this.body = model.body;
    }
    static create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = new IMMessageResponse(model);
            if (message.body.aMessage != null) {
                message.body.aMessage = yield IMMessageResponse.get(message.body.aMessage.id);
            }
            return message;
        });
    }
    static get(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield models_1.IMMessage.findByPk(messageId, { include: IMMessageResponse.include() });
            if (message == null)
                return null;
            return yield IMMessageResponse.create(message);
        });
    }
    static list(channelId, userId, limit = 20, offset = 0, withCache = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (withCache) {
                const cacheData = yield cache_1.default.getInstance().get(`imMessages:${channelId}`);
                if (cacheData != null)
                    return JSON.parse(cacheData);
            }
            const person = yield models_1.Person.findOne({ where: { userId } });
            if (person == null)
                return [];
            // проверяем, что пользователь подписан на канал
            const personChannel = yield models_1.IMChannelPerson.findOne({ where: { channelId, personId: person.id } });
            if (personChannel == null)
                return [];
            const messages = yield models_1.IMMessage.findAll({ where: { channelId, deleted: false }, include: IMMessageResponse.include(), order: [["id", "desc"]], limit, offset });
            if (messages == null || messages.length == 0)
                return [];
            let list = [];
            for (let message of messages) {
                const item = yield IMMessageResponse.create(message);
                list.unshift(item);
            }
            if (withCache)
                cache_1.default.getInstance().set(`imMessages:${channelId}`, JSON.stringify(list));
            return list;
        });
    }
    static seed(action, params, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (socket.authToken == null)
                return [];
            const user = yield models_1.User.findByPk(socket.authToken.id);
            if (user == null || user.banned || user.deleted)
                return [];
            return yield IMMessageResponse.list(params[0], socket.authToken.id);
        });
    }
    static include() {
        return [
            { model: models_1.IMChannel },
            {
                model: models_1.Person,
                include: [
                    {
                        model: models_1.Resident,
                        include: [{ model: models_1.Flat }]
                    }
                ]
            }
        ];
    }
}
exports.default = IMMessageResponse;
