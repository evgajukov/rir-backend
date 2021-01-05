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
const im_message_model_1 = require("../../models/im/im.message.model");
const response_1 = require("../response");
class IMChannelResponse extends response_1.default {
    constructor(model) {
        super(model.id);
        this.title = model.title;
        const messages = model.messages;
        if (messages != null && messages.length != 0) {
            const lastMessage = messages.sort((msg1, msg2) => {
                if (msg1.id > msg2.id)
                    return -1;
                if (msg1.id < msg2.id)
                    return 1;
                return 0;
            })[0];
            this.lastMessage = {
                createdAt: lastMessage.createdAt.getTime(),
                body: lastMessage.body
            };
            if (lastMessage.personId != null) {
                this.lastMessage.person = { id: lastMessage.personId };
                const access = lastMessage.person.access;
                if (access.name.level == "all") {
                    if (access.name.format == "all") {
                        this.lastMessage.person.surname = lastMessage.person.surname;
                        this.lastMessage.person.name = lastMessage.person.name;
                        this.lastMessage.person.midname = lastMessage.person.midname;
                    }
                    else if (access.name.format == "name") {
                        this.lastMessage.person.name = lastMessage.person.name;
                    }
                }
                const flat = lastMessage.person.residents[0].flat;
                this.lastMessage.person.flat = {
                    id: flat.id,
                    number: flat.number,
                    section: flat.section,
                    floor: flat.floor
                };
            }
            this.count = messages.length;
        }
    }
    static create(model) {
        return new IMChannelResponse(model);
    }
    static get(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield models_1.IMChannel.findByPk(channelId, { include: IMChannelResponse.include() });
            if (channel == null)
                return null;
            return IMChannelResponse.create(channel);
        });
    }
    static list(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield models_1.Person.findOne({ where: { userId } });
            if (person == null)
                return [];
            const channelsPersons = yield models_1.IMChannelPerson.findAll({
                where: { personId: person.id },
                include: [{ model: models_1.IMChannel, include: IMChannelResponse.include() }]
            });
            if (channelsPersons == null || channelsPersons.length == 0)
                return [];
            return channelsPersons.map(item => IMChannelResponse.create(item.channel)).sort((ch1, ch2) => {
                if (ch1.lastMessage.createdAt > ch2.lastMessage.createdAt)
                    return 1;
                if (ch1.lastMessage.createdAt < ch2.lastMessage.createdAt)
                    return -1;
                return 0;
            });
        });
    }
    static seed(action, params, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (socket.authToken == null)
                return [];
            return yield IMChannelResponse.list(socket.authToken.id);
        });
    }
    static include() {
        return [
            {
                model: im_message_model_1.default,
                include: [
                    {
                        model: models_1.Person,
                        include: [
                            {
                                model: models_1.Resident,
                                include: [{ model: models_1.Flat }]
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
exports.default = IMChannelResponse;
