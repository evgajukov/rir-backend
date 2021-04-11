'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn extra to companies
 *
 **/

var info = {
  "revision": 7,
  "name": "create-table-companies",
  "created": "2021-02-08T10:01:00.000Z",
  "comment": "Добавление дополнительных данных для дома"
};

var migrationCommands = [

  // addColumn extra to companies
  {
    fn: "addColumn",
    params: [
      "companies",
      "extra",
      {
        "comment": "Любые дополнительные данные",
        "type": Sequelize.JSON
      }
    ]
  }
];

var rollbackCommands = [{
  fn: "removeColumn",
  params: ["companies", "extra"]
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
