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
const db_1 = require("./db");
const user = require("./actions/user");
const department = require("./actions/department");
const vote = require("./actions/vote");
const recommendation = require("./actions/recommendation");
const notification = require("./actions/notification");
const im = require("./actions/im");
const version = require("./actions/version");
const admin = require("./actions/admin");
const responses = require("./responses");
const timelogger_1 = require("./lib/timelogger");
function handleSocket(socket) {
    socket.on("subscribe", channel => seedData(channel, socket));
    const { Session } = db_1.default.models;
    socket.on("authenticate", Session.onLogin.bind(socket));
    socket.on("deauthenticate", Session.onLogout.bind(socket));
    socket.on("disconnect", Session.onLogout.bind(socket));
    bindActions(socket, "user", user);
    bindActions(socket, "department", department);
    bindActions(socket, "vote", vote);
    bindActions(socket, "recommendation", recommendation);
    bindActions(socket, "notification", notification);
    bindActions(socket, "im", im);
    bindActions(socket, "version", version);
    bindActions(socket, "admin", admin);
}
exports.default = handleSocket;
function bindActions(socket, namespace, actions) {
    for (let action in actions) {
        socket.on([namespace, action].join('.'), actions[action].bind(socket));
    }
}
function publishData(socket, channel, rows) {
    console.log(`publishData to CHANNEL: ${channel}`);
    if (rows != null) {
        if (rows instanceof Array) {
            for (let data of rows) {
                socket.emit("#publish", { channel, data: { event: "create", data } });
            }
        }
        else {
            let data = rows;
            socket.emit("#publish", { channel, data: { event: "create", data } });
        }
    }
    socket.emit("#publish", { channel, data: { event: "ready" } });
}
function seedData(channel, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        let [name, ...params] = channel.split('.');
        console.log(`### [${new Date()}] channel = ${channel}`);
        console.log(`### [${new Date()}] name = ${name}`);
        console.log(`### [${new Date()}] params = ${params}`);
        let respChannel = responses.channels[name];
        if (!respChannel) {
            console.error(`### [${new Date()}] Не найден канал ответа по ${name}`);
            return;
        }
        let response = respChannel.response;
        if (response && typeof response.seed === "function") {
            const rows = yield timelogger_1.default(response.seed, channel)(respChannel.action, normalizeParams(params), socket);
            publishData(socket, channel, rows);
        }
    });
}
/**
 * Нормализует параметры канала
 * @param params список параметров канала
 */
function normalizeParams(params) {
    if (params instanceof Array) {
        return params.map(item => {
            const intValue = parseInt(item);
            return intValue == item ? intValue : item;
        });
    }
    else {
        const intValue = parseInt(params);
        return intValue == params ? intValue : params;
    }
}
