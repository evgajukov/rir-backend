'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn pin to posts
 * addIndex "posts_pin" to table "posts"
 *
 **/

var info = {
  "revision": 5,
  "name": "add-pin-post",
  "created": "2021-01-24T10:22:00.000Z",
  "comment": "Добавление признака закрепленной новости"
};

var migrationCommands = [

  // addColumn pin to posts
  {
    fn: "addColumn",
    params: [
      "posts",
      "pin",
      {
        "defaultValue": false,
        "type": Sequelize.BOOLEAN
      }
    ]
  },

  // addIndex posts pin
  {
    fn: "addIndex",
    params: [
      "posts",
      [{
        "name": "pin"
      }],
      {
        "indexName": "posts_pin"
      }
    ]
  }
];

var rollbackCommands = [{
  fn: "removeColumn",
  params: ["posts", "pin"]
},
{
  fn: "removeIndex",
  params: ["posts", "posts_pin"]
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
