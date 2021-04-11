'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "companies", deps: []
 * addColumn companyId to flats
 *
 **/

var info = {
  "revision": 6,
  "name": "create-table-companies",
  "created": "2021-01-25T18:20:00.000Z",
  "comment": "Добавление таблицы для хранения данных по самой компании с связка с ним квартир"
};

var migrationCommands = [

  // createTable companies
  {
    fn: "createTable",
    params: [
      "companies",
      {
        "id": {
          "autoIncrement": true,
          "primaryKey": true,
          "allowNull": false,
          "type": Sequelize.INTEGER
        },
        "createdAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "updatedAt": {
          "allowNull": false,
          "type": Sequelize.DATE
        },
        "title": {
          "allowNull": false,
          "type": Sequelize.STRING
        }
      },
      {
        "comment": "Компании, подключенные к сервису"
      }
    ]
  },

  // addColumn companyId to flats
  {
    fn: "addColumn",
    params: [
      "flats",
      "companyId",
      {
        "onDelete": "NO ACTION",
        "onUpdate": "CASCADE",
        "references": {
          "model": "companies",
          "key": "id"
        },
        "allowNull": true,
        "type": Sequelize.INTEGER
      }
    ]
  }
];

var rollbackCommands = [{
  fn: "removeColumn",
  params: ["flats", "companyId"]
},
{
  fn: "dropTable",
  params: ["companies"]
}];

module.exports = {
  pos: 0,
  up: function (queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#" + index + "] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        }
        else
          resolve();
      }
      next();
    });
  },
  down: function (queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log("[#" + index + "] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        }
        else
          resolve();
      }
      next();
    });
  },
  info: info
};
