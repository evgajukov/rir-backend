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
class RecommendationResponse extends response_1.default {
    constructor(model) {
        super(model.id);
        this.title = model.title;
        this.body = model.body;
        this.extra = model.extra;
        this.category = {
            id: model.category.id,
            name: model.category.name,
            img: model.category.img,
            sort: model.category.sort
        };
        this.person = person_type_1.getPerson(model.person);
    }
    static create(model) {
        return new RecommendationResponse(model);
    }
    static get(recommendationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield models_1.Recommendation.findByPk(recommendationId, { include: RecommendationResponse.include() });
            if (item == null)
                return null;
            return RecommendationResponse.create(item);
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield models_1.Recommendation.findAll({ include: RecommendationResponse.include() });
            if (list == null || list.length == 0)
                return [];
            return list.map(item => RecommendationResponse.create(item));
        });
    }
    static seed(action, params, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RecommendationResponse.list();
        });
    }
    static include() {
        return [
            {
                model: models_1.RecommendationCategory
            },
            {
                model: models_1.Person,
                include: [
                    {
                        model: models_1.Resident,
                        separate: true,
                        include: [{ model: models_1.Department }]
                    }
                ]
            }
        ];
    }
}
exports.default = RecommendationResponse;
