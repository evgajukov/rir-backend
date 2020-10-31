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
const queue_model_1 = require("./queue.model");
class Job {
    constructor(prefix, name, data) {
        this.prefix = prefix;
        this.name = name;
        this._data = data;
    }
    get id() {
        return this._id;
    }
    get data() {
        return this._data;
    }
    static load(prefix, name, status, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = yield queue_model_1.default.findOne({ where: { prefix, name, status } });
            if (model == null)
                return null;
            if (newStatus)
                yield model.update({ status: newStatus });
            const job = new Job(model.prefix, model.name, JSON.parse(model.data));
            job.setId(model.id);
            return job;
        });
    }
    save(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = yield queue_model_1.default.create({
                    prefix: this.prefix,
                    name: this.name,
                    data: JSON.stringify(this._data)
                });
                this._id = model.id;
                if (handler)
                    handler(this);
            }
            catch (error) {
                if (handler)
                    handler(this, error.message);
            }
            return this;
        });
    }
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(`>>>>> job.reset`);
            // console.log(`      >>> ID: ${this._id}`);
            const model = yield queue_model_1.default.findByPk(this._id);
            if (model != null) {
                yield model.update({ status: "NEW" });
                // console.log(`      >>> job founded and update to NEW`);
            }
            else {
                // console.log(`      >>> job not founded !!!!!!!!!!`);
            }
        });
    }
    done() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(`>>>>> job.done`);
            // console.log(`      >>> ID: ${this._id}`);
            const model = yield queue_model_1.default.findByPk(this._id);
            if (model != null) {
                yield model.update({ status: "SUCCESS" });
                // console.log(`      >>> job founded and update to SUCCESS`);
            }
            else {
                // console.log(`      >>> job not founded !!!!!!!!!!`);
            }
            queue_model_1.default.destroy({ where: { status: "SUCCESS" } });
        });
    }
    setId(id) {
        this._id = id;
    }
}
exports.default = Job;
