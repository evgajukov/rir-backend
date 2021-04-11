'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn img to recommendationCategories
 * addColumn sort to recommendationCategories
 *
 **/

var info = {
  "revision": 9,
  "name": "create-table-companies",
  "created": "2021-02-14T13:56:00.000Z",
  "comment": "Добавление картинки и сортировки для категорий рекомендаций"
};

var migrationCommands = [

  // addColumn img to recommendationCategories
  {
    fn: "addColumn",
    params: [
      "recommendationCategories",
      "img",
      {
        "type": Sequelize.STRING
      }
    ]
  },

  // addColumn sort to recommendationCategories
  {
    fn: "addColumn",
    params: [
      "recommendationCategories",
      "sort",
      {
        "defaultValue": 0,
        "type": Sequelize.INTEGER
      }
    ]
  }
];

var rollbackCommands = [{
  fn: "removeColumn",
  params: ["recommendationCategories", "img"]
},
{
  fn: "removeColumn",
  params: ["recommendationCategories", "sort"]
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
