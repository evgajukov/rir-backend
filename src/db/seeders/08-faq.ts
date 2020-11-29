import { FAQCategory, FAQItem } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await FAQCategory.sync({ force: true });
    await FAQItem.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    FAQItem.destroy({ where: {} });
    FAQCategory.destroy({ where: {} });
  }

};