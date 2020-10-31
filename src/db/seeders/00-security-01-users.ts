import { User, Session, Role } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Role.sync({ force: true });
    await User.sync({ force: true });
    await Session.sync({ force: true });

    await Role.create({ name: "Администратор", code: "ADMIN" });
    await Role.create({ name: "Пользователь", code: "USER" });
  },

  down: (queryInterface, Sequelize) => {
    Session.destroy({ where: {} });
    User.destroy({ where: {} });
    Role.destroy({ where: {} });
  }

};