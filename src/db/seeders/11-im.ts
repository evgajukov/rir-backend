import { IMMessage, IMMessageShow, IMChannel, IMChannelPerson } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await IMChannel.sync({ force: true });
    await IMMessage.sync({ force: true });
    await IMChannelPerson.sync({ force: true });
    await IMMessageShow.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    IMMessageShow.destroy({ where: {} });
    IMChannelPerson.destroy({ where: {} });
    IMMessage.destroy({ where: {} });
    IMChannel.destroy({ where: {} });
  }

};