"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("./config");
const cls = require("continuation-local-storage");
const clsBluebird = require("cls-bluebird");
const Promise = require("bluebird");
const ns = global.namespace = cls.createNamespace('exchange');
clsBluebird(ns, Promise);
sequelize_typescript_1.Sequelize.useCLS(ns);
const option = {
    host: config_1.default.db.host,
    port: config_1.default.db.port,
    database: config_1.default.db.database,
    dialect: config_1.default.db.dialect,
    username: config_1.default.db.username,
    password: config_1.default.db.password,
    storage: ":memory:",
    modelPaths: [__dirname + "/**/*.model.ts"],
    // operatorsAliases: false,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
exports.sequelize = new sequelize_typescript_1.Sequelize(option);
exports.default = exports.sequelize;
