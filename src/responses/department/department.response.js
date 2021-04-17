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
const person_type_1 = require("../type/person.type");
class DepartmentResponse extends response_1.default {
    constructor(model) {
        super(model.id);
        this.title = model.title;
        if (model.parent != null) {
            this.parent = {
                id: model.parent.id,
                title: model.parent.title
            };
        }
        this.residents = [];
        model.residents.forEach(resident => {
            const person = person_type_1.getPerson(resident.person);
            this.residents.push({
                personId: person.id,
                surname: person.surname,
                name: person.name,
                midname: person.midname,
                deleted: person.deleted
            });
        });
    }
    static create(model) {
        return new DepartmentResponse(model);
    }
    static list(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield models_1.Person.findOne({
                where: { userId },
                include: [
                    {
                        model: models_1.Resident,
                        include: [{ model: models_1.Department }]
                    }
                ]
            });
            const companyId = (person != null && person.residents.length != 0) ? person.residents[0].department.companyId : 1;
            const list = yield models_1.Department.findAll({
                where: { companyId },
                include: [{ model: models_1.Resident, include: [{ model: models_1.Person, include: [{ model: models_1.User }] }] }],
                order: ["id"]
            });
            if (list == null || list.length == 0)
                return [];
            return list.map(flat => DepartmentResponse.create(flat));
        });
    }
    static seed(action, params, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (socket.authToken == null)
                return [];
            return yield DepartmentResponse.list(socket.authToken.id);
        });
    }
}
exports.default = DepartmentResponse;
