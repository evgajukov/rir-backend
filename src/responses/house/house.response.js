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
class HouseResponse extends response_1.default {
    constructor(model) {
        super(model.id);
        this.address = model.address;
        this.dadata = model.dadata;
        this.coord.lat = model.lat;
        this.coord.lon = model.lon;
        this.extra = model.extra;
    }
    static create(model) {
        return new HouseResponse(model);
    }
    static info(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield models_1.Person.findOne({
                where: { userId },
                include: [
                    {
                        model: models_1.Resident,
                        include: [{ model: models_1.Flat }]
                    }
                ]
            });
            const houseId = person != null ? person.residents[0].flat.houseId : 1;
            const house = yield models_1.House.findByPk(houseId);
            if (house == null)
                return null;
            return HouseResponse.create(house);
        });
    }
    static seed(action, params, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (socket.authToken == null)
                return null;
            return yield HouseResponse.info(socket.authToken.id);
        });
    }
}
exports.default = HouseResponse;
