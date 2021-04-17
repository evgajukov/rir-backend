import { Department, Company, Resident } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Company.sync({ force: true });
    await Department.sync({ force: true });
    await Resident.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    Resident.destroy({ where: {} });
    Department.destroy({ where: {} });
    Company.destroy({ where: {} });
  }

};