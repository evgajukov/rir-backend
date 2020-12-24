"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
function ping({ version, build }, respond) {
    console.log(`>>>>> actions/test.ping: ver. ${version} build ${build}`);
    respond(null, { status: "OK" });
}
exports.ping = ping;
