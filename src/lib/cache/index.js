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
const config_1 = require("../../config");
const redis = require("redis");
const util_1 = require("util");
class Cache {
    constructor() {
        this.client = null;
        this.caching = config_1.default.redis.caching != null ? config_1.default.redis.caching : false;
        const options = {
            host: config_1.default.redis.host,
            password: config_1.default.redis.password
        };
        if (this.caching)
            this.client = redis.createClient(options);
    }
    static getInstance() {
        if (Cache.instance == null)
            Cache.instance = new Cache();
        return Cache.instance;
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.caching)
                return null;
            const getAsync = util_1.promisify(this.client.get).bind(this.client);
            return yield getAsync(key);
        });
    }
    set(key, value) {
        if (!this.caching)
            return;
        this.client.set(key, value);
    }
    clear(pattern = "*") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.caching)
                return;
            try {
                const keysAsync = util_1.promisify(this.client.keys).bind(this.client);
                const keys = yield keysAsync(pattern);
                if (keys.length != 0)
                    this.client.del(keys);
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
}
exports.default = Cache;
Cache.instance = null;
