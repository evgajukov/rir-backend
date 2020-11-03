import { Invite } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Invite.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    Invite.destroy({ where: {} });
  }

};