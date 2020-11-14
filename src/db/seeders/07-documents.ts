import { Document } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Document.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    Document.destroy({ where: {} });
  }

};