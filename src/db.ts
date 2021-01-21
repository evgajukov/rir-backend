import { Sequelize } from "sequelize-typescript";
import config from "./config";
import * as cls from "continuation-local-storage";
import * as clsBluebird from "cls-bluebird";
import * as Promise from "bluebird";

const ns = (global as any).namespace = cls.createNamespace('exchange');
clsBluebird(ns, Promise);
Sequelize.useCLS(ns);

const option = {
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  dialect: config.db.dialect,
  username: config.db.username,
  password: config.db.password,
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

export const sequelize = new Sequelize(option);

export default sequelize;