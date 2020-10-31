import { Event, EventLog } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Event.sync({ force: true });
    await EventLog.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    EventLog.destroy({ where: {} });
    Event.destroy({ where: {} });
  }

};