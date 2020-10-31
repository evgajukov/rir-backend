"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
function ping(params, respond) {
    console.log(">>>>> actions/test.ping");
    respond(null, { status: "OK" });
}
exports.ping = ping;
