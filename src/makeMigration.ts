import { DataType, Sequelize, SequelizeOptions } from "sequelize-typescript";
import { SequelizeTypescriptMigration } from "sequelize-typescript-migration";
import config from "./config";

import {
  Event, EventLog,
  Session, User, Role,
  Person, Flat, Resident, Invite,
  Post, Instruction, Document,
  FAQCategory, FAQItem,
  Vote, VoteQuestion, VoteAnswer, VotePerson,
  IMMessage, IMChannel, IMChannelPerson, IMMessageShow,
  NotificationToken, Version } from "./models";

(async () => {
  const option: SequelizeOptions = {
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    dialect: config.db.dialect,
    username: config.db.username,
    password: config.db.password,
    models: [Event, EventLog,
      Session, User, Role,
      Person, Flat, Resident, Invite,
      Post, Instruction, Document,
      FAQCategory, FAQItem,
      Vote, VoteQuestion, VoteAnswer, VotePerson,
      IMMessage, IMChannel, IMChannelPerson, IMMessageShow,
      NotificationToken, Version],
    // operatorsAliases: false,
    logging: false
  };
  const sequelize = new Sequelize(option);

  const queryInterface = sequelize.getQueryInterface();
  await queryInterface.createTable('sequelizemeta', {
    name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
  });
  await queryInterface.createTable('sequelizemetamigrations', {
    revision: {
      type: DataType.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    state: {
      type: DataType.JSON,
      allowNull: false,
    },
  });

  await SequelizeTypescriptMigration.makeMigration(sequelize, {
    outDir: __dirname + "/db/migrations"
  });
})();