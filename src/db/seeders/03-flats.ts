import { Flat, House, Resident } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await House.sync({ force: true });
    await Flat.sync({ force: true });
    await Resident.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    Resident.destroy({ where: {} });
    Flat.destroy({ where: {} });
    House.destroy({ where: {} });
  }

};