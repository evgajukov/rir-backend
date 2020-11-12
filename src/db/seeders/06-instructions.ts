import { Instruction } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Instruction.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    Instruction.destroy({ where: {} });
  }

};