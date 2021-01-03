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
class IMMessageResponse extends response_1.default {
    constructor(model) {
        super(model.id);
        this.createdAt = model.createdAt.getTime();
        if (model.personId != null) {
            this.person = {
                id: model.personId
            };
            const access = model.person.access;
            if (access.name.level == "all") {
                if (access.name.format == "all") {
                    this.person.surname = model.person.surname;
                    this.person.name = model.person.name;
                    this.person.midname = model.person.midname;
                }
                else if (access.name.format == "name") {
                    this.person.name = model.person.name;
                }
            }
            const flat = model.person.residents[0].flat;
            this.person.flat = {
                id: flat.id,
                number: flat.number,
                section: flat.section,
                floor: flat.floor
            };
        }
        this.channel = {
            id: model.channel.id,
            title: model.channel.title
        };
        this.body = model.body;
    }
    static create(model) {
        return new IMMessageResponse(model);
    }
    static get(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield models_1.IMMessage.findByPk(messageId, { include: IMMessageResponse.include() });
            if (message == null)
                return null;
            return IMMessageResponse.create(message);
        });
    }
    static list(channelId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield models_1.Person.findOne({ where: { userId } });
            if (person == null)
                return [];
            // проверяем, что пользователь подписан на канал
            const personChannel = yield models_1.IMChannelPerson.findOne({ where: { channelId, personId: person.id } });
            if (personChannel == null)
                return [];
            const messages = yield models_1.IMMessage.findAll({ where: { channelId }, include: IMMessageResponse.include(), order: [["id", "desc"]], limit: 100 });
            if (messages == null || messages.length == 0)
                return [];
            return messages.map(message => IMMessageResponse.create(message));
        });
    }
    static seed(action, params, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (socket.authToken == null)
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
