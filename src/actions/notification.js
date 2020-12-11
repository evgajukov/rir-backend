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
exports.saveToken = void 0;
const models_1 = require("../models");
const errors_1 = require("./errors");
function saveToken({ token }, respond) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(">>>>> actions/notification.saveToken");
        try {
            if (!this.authToken)
                throw new Error(errors_1.default.user["004"].code);
            const notifToken = yield models_1.NotificationToken.findOne({ where: { token } });
            if (!notifToken)
                yield models_1.NotificationToken.create({ userId: this.authToken.id, token });
            respond(null, { status: "OK" });
        }
        catch (error) {
            console.error(error);
            respond(errors_1.default.methods.check(errors_1.default, error.message));
        }
    });
}
exports.saveToken = saveToken;
