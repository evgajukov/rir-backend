'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn deleted to users
 *
 **/

var info = {
  "revision": 4,
  "name": "user-deleted",
  "created": "2021-01-23T17:23:00.000Z",
  "comment": "Добавление признака удаленного пользователя"
};

var migrationCommands = [

  // addColumn deleted to users
  {
    fn: "addColumn",
    params: [
      "users",
      "deleted",
      {
        "defaultValue": false,
        "type": Sequelize.BOOLEAN
      }
    ]
  }
];

var rollbackCommands = [{
  fn: "removeColumn",
  params: ["users", "deleted"]
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
