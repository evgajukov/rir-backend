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
const _ = require("lodash");
const sequelize_1 = require("sequelize");
class EventResponse extends response_1.default {
    constructor(event) {
        super(event.id, event);
        this.shown = false;
        this.createdAt = new Date(event.createdAt).getTime();
        this.type = event.type;
        this.status = event.status;
        this.data = JSON.parse(event.data);
        this.priority = event.priority;
    }
    static create(model, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let event = new EventResponse(model);
            if (userId) {
                let item = yield models_1.EventLog.findOne({ where: { userId, eventId: event.id } });
                event.shown = item != null;
            }
            return event;
        });
    }
    static get(eventId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield models_1.Event.findOne({ where: { id: eventId } });
            if (model == null) {
                return null;
            }
            return _.pick(yield EventResponse.create(model, userId), EventResponse.FIELDS);
        });
    }
    static list(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = { [sequelize_1.Op.or]: [{ userId }, { userId: { [sequelize_1.Op.eq]: null } }] };
            let models = yield models_1.Event.findAll({ where, order: [["id", "DESC"]], limit: EventResponse.MAX_LIMIT });
            if (models == null || models.length == 0) {
                return [];
            }
            let list = [];
            for (let model of models) {
                list.push(_.pick(yield EventResponse.create(model, userId), EventResponse.FIELDS));
            }
            list.reverse();
            return list;
        });
    }
    static seed(action, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield EventResponse.list(params);
        });
    }
}
exports.default = EventResponse;
EventResponse.MAX_LIMIT = 4;
EventResponse.FIELDS = ["id", "createdAt", "type", "status", "data", "priority", "shown"];
