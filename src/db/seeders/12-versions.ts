import { Version } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Version.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    Version.destroy({ where: {} });
  }

};