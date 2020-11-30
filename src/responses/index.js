"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentResponse = exports.InviteResponse = exports.InstructionResponse = exports.PostResponse = exports.UserResponse = exports.FlatResponse = exports.PingResponse = exports.EventResponse = exports.channels = void 0;
const event_response_1 = require("./event/event.response");
exports.EventResponse = event_response_1.default;
const all_response_1 = require("./all/all.response");
const ping_response_1 = require("./ping/ping.response");
exports.PingResponse = ping_response_1.default;
const flat_response_1 = require("./flat/flat.response");
exports.FlatResponse = flat_response_1.default;
const user_response_1 = require("./user/user.response");
exports.UserResponse = user_response_1.default;
const post_response_1 = require("./post/post.response");
exports.PostResponse = post_response_1.default;
const instruction_response_1 = require("./instruction/instruction.response");
exports.InstructionResponse = instruction_response_1.default;
const invite_response_1 = require("./invite/invite.response");
exports.InviteResponse = invite_response_1.default;
const document_response_1 = require("./document/document.response");
exports.DocumentResponse = document_response_1.default;
const faq_response_1 = require("./faq/faq.response");
const vote_response_1 = require("./vote/vote.response");
const channels = {
    events: {
        action: "LIST",
        response: event_response_1.default
    },
    ping: {
        action: "PING",
        response: ping_response_1.default
    },
    all: {
        action: "INIT",
        response: all_response_1.default
    },
    flats: {
        action: "LIST",
        response: flat_response_1.default
    },
    user: {
        action: "INFO",
        response: user_response_1.default
    },
    posts: {
        action: "LIST",
        response: post_response_1.default
    },
    instructions: {
        action: "LIST",
        response: instruction_response_1.default
    },
    invites: {
        action: "LIST",
        response: invite_response_1.default
    },
    documents: {
        action: "LIST",
        response: document_response_1.default
    },
    faq: {
        action: "LIST",
        response: faq_response_1.default
    },
    votes: {
        action: "LIST",
        response: vote_response_1.default
    },
};
exports.channels = channels;
