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
const config_1 = require("../../config");
const queue_1 = require("../../queue");
class Sender {
    static event(userId, type, status, data, priority) {
        return __awaiter(this, void 0, void 0, function* () {
            Sender.queue = new queue_1.default(config_1.default.kue_web.prefix);
            if (!data)
                data = {};
            let eventData = {
                userId,
                type,
                status,
                data: JSON.stringify(data)
            };
            if (priority) {
                eventData["priority"] = priority;
            }
            if (eventData.status != "PROCESS" || data.withProcessEvent) {
                const eventModel = yield models_1.Event.create(eventData);
                eventData["id"] = eventModel.id;
                eventData["createDt"] = eventModel.createdAt;
                eventData["priority"] = eventModel.priority;
            }
            Sender.queue.create(Sender.EVENT_NAME, eventData).save();
        });
    }
}
exports.default = Sender;
Sender.EVENT_NAME = "EVENT";
