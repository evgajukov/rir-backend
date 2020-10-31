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
const responses = require("./responses");
const publish_hooks_1 = require("./lib/publish_hooks");
const socket_handler_1 = require("./socket_handler");
const models_1 = require("./models");
const queue_1 = require("./queue");
const config_1 = require("./config");
const response_update_1 = require("./responses/response.update");
function run(worker) {
    return __awaiter(this, void 0, void 0, function* () {
        const scServer = worker.scServer;
        scServer.on("connection", socket_handler_1.default);
        for (let response in responses) {
            if (response == "channels")
                continue;
            publish_hooks_1.default(responses[response], scServer.exchange);
        }
        scServer.addMiddleware(scServer.MIDDLEWARE_EMIT, (req, next) => __awaiter(this, void 0, void 0, function* () {
            const allowedEvents = ['user.logout'];
            if (includes(allowedEvents, req.event))
                return next();
            if (req.socket.authState !== req.socket.AUTHENTICATED)
                return next();
            const user = yield models_1.User.findByPk(req.socket.authToken.id);
            return next(user.banned ? new Error("15") : null);
        }));
        const queue = new queue_1.default(config_1.default.kue_web.prefix);
        queue.process("EVENT", (job) => __awaiter(this, void 0, void 0, function* () {
            console.log(`HANDLER JOB (ID: ${job.id}) TYPE "EVENT": ${JSON.stringify(job.data)}`);
            // обновляем данные в каналах
            const responseUpdate = new response_update_1.default(scServer.exchange);
            yield responseUpdate.update(job.data);
            yield job.done();
        }));
    });
}
exports.default = run;
function includes(list, str) {
    for (let item of list) {
        if (item == str) {
            return true;
        }
    }
    return false;
}
