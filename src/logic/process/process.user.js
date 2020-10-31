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
const process_1 = require("./process");
const sender_1 = require("../event/sender");
class UserProcess extends process_1.default {
    constructor(name, userId, data, withProcessEvent = true) {
        super(name, data);
        this.userId = userId;
        this.withProcessEvent = withProcessEvent;
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.data == null)
                    this.data = {};
                this.data["status"] = UserProcess.STATUS_PROCESS;
                this.data["withProcessEvent"] = this.withProcessEvent;
                yield sender_1.default.event(this.userId, this.name, UserProcess.STATUS_PROCESS, this.data);
                const status = yield this.run();
                this.data["status"] = status.status;
                this.data["code"] = status.code;
                yield sender_1.default.event(this.userId, this.name, status.status, this.data);
            }
            catch (error) {
                this.error(error);
            }
        });
    }
    error(error) {
        const _super = Object.create(null, {
            error: { get: () => super.error }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.error.call(this, error);
            const data = { code: process_1.PROCESS_STATUS_CODES.ERR_UNKNOWN, error };
            yield sender_1.default.event(this.userId, this.name, UserProcess.STATUS_ERROR, data);
        });
    }
}
exports.default = UserProcess;
