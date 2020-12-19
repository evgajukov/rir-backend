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
class IMChannelResponse extends response_1.default {
    constructor(model) {
        super(model.id);
        this.title = model.title;
    }
    static create(model) {
        return new IMChannelResponse(model);
    }
    static list(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield models_1.Person.findOne({ where: { userId } });
            if (person == null)
                return [];
            const channelsPersons = yield models_1.IMChannelPerson.findAll({ where: { personId: person.id }, include: [{ model: models_1.IMChannel }] });
            if (channelsPersons == null || channelsPersons.length == 0)
                return [];
            return channelsPersons.map(item => IMChannelResponse.create(item.channel));
        });
    }
    static seed(action, params, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (socket.authToken == null)
                return [];
            return yield IMChannelResponse.list(socket.authToken.id);
        });
    }
}
exports.default = IMChannelResponse;
