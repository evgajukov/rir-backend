import { NotificationToken } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await NotificationToken.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    NotificationToken.destroy({ where: {} });
  }

};