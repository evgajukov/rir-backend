'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn private to imChannels
 *
 **/

var info = {
  "revision": 3,
  "name": "add-im-channel-private",
  "created": "2021-01-15T15:23:00.000Z",
  "comment": "Добавление признака приватного канала в чате между двумя пользователями"
};

var migrationCommands = [

  // addColumn private to imChannels
  {
    fn: "addColumn",
    params: [
      "imChannels",
      "private",
      {
        "comment": "Признак, что это приватный канал для двух пользователей",
        "defaultValue": false,
        "type": Sequelize.BOOLEAN
      }
    ]
  }
];

var rollbackCommands = [{
  fn: "removeColumn",
  params: ["imChannels", "private"]
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
