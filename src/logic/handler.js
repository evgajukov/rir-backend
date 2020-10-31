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
// import Event from "./event/event";
// import Schedule from "./event/schedule";
class EventHandler {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("   >> EventHandler.run");
            // Event.run();
            // Schedule.run();
        });
    }
    static handler(name, job, func) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`HANDLER JOB (ID: ${job.id}) TYPE "${name}": ${JSON.stringify(job.data)}`);
            if (EventHandler.busy) {
                console.log(`>>>>> HANDLER JOB (ID: ${job.id}) TYPE "${name}" IS BUSY`);
                yield job.reset();
            }
            try {
                EventHandler.busy = true;
                if (func)
                    yield func(job);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                EventHandler.busy = false;
            }
            yield job.done();
        });
    }
}
exports.default = EventHandler;
// private static queue = new Queue(config.kue_pl.prefix_without_srv);
EventHandler.busy = false;
