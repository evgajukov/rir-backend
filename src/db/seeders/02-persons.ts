import { Person } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Person.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    Person.destroy({ where: {} });
  }

};