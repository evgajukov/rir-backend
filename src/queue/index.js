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
const job_1 = require("./job");
class Queue {
    constructor(prefix) {
        this.prefix = prefix;
        console.log(`QUEUE PREFIX: ${prefix}`);
    }
    create(name, data) {
        return new job_1.default(this.prefix, name, data);
    }
    process(name, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`QUEUE PROCESS: ${name}`);
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const job = yield job_1.default.load(this.prefix, name, "NEW", "PROCESS");
                if (job == null)
                    return;
                if (handler)
                    yield handler(job);
            }), Queue.INTERVAL);
        });
    }
}
exports.default = Queue;
Queue.INTERVAL = 1000;
