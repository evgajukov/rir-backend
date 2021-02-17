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
            if (user.banned)
                return next(new Error("BANNED"));
            else if (user.deleted)
                return next(new Error("DELETED"));
            return next(null);
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
