"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ENV_NAME = {
    DEV: "development",
    PROD: "production"
};
const DEFAULT_ENV_NAME = ENV_NAME.DEV;
const env = process.env.NODE_ENV || DEFAULT_ENV_NAME;
const db = require("./db/credentials")[env];
const config = {
    env,
    db: db,
    redis: {
        caching: process.env.CACHE_FLAG == "true",
        host: process.env.CACHE_REDIS_HOST,
        login: process.env.CACHE_REDIS_LOGIN,
        password: process.env.CACHE_REDIS_PASSWORD
    }
};
exports.default = config;
