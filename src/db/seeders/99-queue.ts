import Queue from "../../queue/queue.model";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Queue.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    Queue.destroy({ where: {} });
  }

};