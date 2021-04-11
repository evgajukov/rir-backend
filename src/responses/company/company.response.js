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
class CompanyResponse extends response_1.default {
    constructor(model) {
        super(model.id);
        this.title = model.title;
        this.extra = model.extra;
    }
    static create(model) {
        return new CompanyResponse(model);
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
            const companyId = (person != null && person.residents.length != 0) ? person.residents[0].flat.companyId : 1;
            const company = yield models_1.Company.findByPk(companyId);
            if (company == null)
                return null;
            return CompanyResponse.create(company);
        });
    }
    static seed(action, params, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (socket.authToken == null)
                return null;
            return yield CompanyResponse.info(socket.authToken.id);
        });
    }
}
exports.default = CompanyResponse;
