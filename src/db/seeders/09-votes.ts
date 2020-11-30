import { Vote, VoteQuestion, VoteAnswer, VotePerson } from "../../models";

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await Vote.sync({ force: true });
    await VoteQuestion.sync({ force: true });
    await VoteAnswer.sync({ force: true });
    await VotePerson.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    VotePerson.destroy({ where: {} });
    VoteAnswer.destroy({ where: {} });
    VoteQuestion.destroy({ where: {} });
    Vote.destroy({ where: {} });
  }

};