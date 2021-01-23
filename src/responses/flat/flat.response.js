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
const im_person_type_1 = require("../type/im.person.type");
class FlatResponse extends response_1.default {
    constructor(model) {
        super(model.id);
        this.number = model.number;
        this.floor = model.floor;
        this.section = model.section;
        this.rooms = model.rooms;
        this.square = model.square;
        this.residents = [];
        model.residents.forEach(resident => {
            const person = im_person_type_1.getPerson(resident.person);
            this.residents.push({
                personId: person.id,
                surname: person.surname,
                name: person.name,
                midname: person.midname,
            });
        });
    }
    static create(model) {
        return new FlatResponse(model);
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield models_1.Flat.findAll({ include: [{ model: models_1.Resident, include: [{ model: models_1.Person }] }], order: ["id"] });
            if (list == null || list.length == 0)
                return [];
            return list.map(flat => FlatResponse.create(flat));
        });
    }
    static seed(action, params, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FlatResponse.list();
        });
    }
}
exports.default = FlatResponse;
