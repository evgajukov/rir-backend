"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = exports.FlatResponse = exports.PingResponse = exports.EventResponse = exports.channels = void 0;
const event_response_1 = require("./event/event.response");
exports.EventResponse = event_response_1.default;
const ping_response_1 = require("./ping/ping.response");
exports.PingResponse = ping_response_1.default;
const flat_response_1 = require("./flat/flat.response");
exports.FlatResponse = flat_response_1.default;
const user_response_1 = require("./user/user.response");
exports.UserResponse = user_response_1.default;
const channels = {
    events: {
        action: "LIST",
        response: event_response_1.default
    },
    ping: {
        action: "PING",
        response: ping_response_1.default
    },
    flats: {
        action: "LIST",
        response: flat_response_1.default
    },
    user: {
        action: "INFO",
        response: user_response_1.default
    },
};
exports.channels = channels;
