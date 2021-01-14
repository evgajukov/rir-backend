'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn mute to imChannelPersons
 *
 **/

var info = {
  "revision": 2,
  "name": "add-im-channel-mute",
  "created": "2021-01-14T12:15:45.407Z",
  "comment": "Добавление признака отключения уведомлений пользователем у группы чата"
};

var migrationCommands = [

  // addColumn mute to imChannelPersons
  {
    fn: "addColumn",
    params: [
      "imChannelPersons",
      "mute",
      {
        "defaultValue": false,
        "type": Sequelize.BOOLEAN
      }
    ]
  }
];

var rollbackCommands = [{
  fn: "removeColumn",
  params: ["imChannelPersons", "mute"]
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
