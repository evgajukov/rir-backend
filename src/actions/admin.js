"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const response_update_1 = require("../responses/response.update");
const errors_1 = require("./errors");
function update({ id, name, event }, respond) {
    console.log(">>>>> actions/admin.update", name);
    try {
        const responseUpdate = new response_update_1.default(this.exchange);
        if (name == "post") {
            // обновляем канал "posts"
            responseUpdate.update({
                createAt: new Date(),
                type: "POST.SAVE",
                status: "SUCCESS",
                data: JSON.stringify({ postId: id, event })
            });
        }
        respond(null, { status: "OK" });
    }
    catch (error) {
        console.error(error);
        respond(errors_1.default.methods.check(errors_1.default, error.message));
    }
}
exports.update = update;
