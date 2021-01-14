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
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_migration_1 = require("sequelize-typescript-migration");
const config_1 = require("./config");
const models_1 = require("./models");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const option = {
        host: config_1.default.db.host,
        port: config_1.default.db.port,
        database: config_1.default.db.database,
        dialect: config_1.default.db.dialect,
        username: config_1.default.db.username,
        password: config_1.default.db.password,
        models: [models_1.Event, models_1.EventLog,
            models_1.Session, models_1.User, models_1.Role,
            models_1.Person, models_1.Flat, models_1.Resident, models_1.Invite,
            models_1.Post, models_1.Instruction, models_1.Document,
            models_1.FAQCategory, models_1.FAQItem,
            models_1.Vote, models_1.VoteQuestion, models_1.VoteAnswer, models_1.VotePerson,
            models_1.IMMessage, models_1.IMChannel, models_1.IMChannelPerson, models_1.IMMessageShow,
            models_1.NotificationToken, models_1.Version],
        // operatorsAliases: false,
        logging: false
    };
    const sequelize = new sequelize_typescript_1.Sequelize(option);
    const queryInterface = sequelize.getQueryInterface();
    yield queryInterface.createTable('sequelizemeta', {
        name: {
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
    });
    yield queryInterface.createTable('sequelizemetamigrations', {
        revision: {
            type: sequelize_typescript_1.DataType.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false,
        },
        state: {
            type: sequelize_typescript_1.DataType.JSON,
            allowNull: false,
        },
    });
    yield sequelize_typescript_migration_1.SequelizeTypescriptMigration.makeMigration(sequelize, {
        outDir: __dirname + "/db/migrations"
    });
}))();
