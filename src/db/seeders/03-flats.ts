import { Flat } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Flat.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    Flat.destroy({ where: {} });
  }

};