import { Post } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Post.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    Post.destroy({ where: {} });
  }

};