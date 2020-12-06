import { Flat, Person, Resident, Vote, VoteAnswer, VotePerson, VoteQuestion } from "../models";
import ResponseUpdate from "../responses/response.update";
import errors from "./errors";

export async function save({ title, questions, anonymous, multi, type }, respond) {
  console.log(">>>>> actions/vote.save");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);
    const person = await Person.findOne({ where: { userId: this.authToken.id } });
    const resident = await Resident.findOne({ where: { personId: person.id }, include: [{ model: Flat }] });
    const flat = resident.flat;

    // создаем голосование
    const house = type == "house";
    const section = type != "house" ? flat.section : null;
    const floor = type == "floor" ? flat.floor : null;
    const vote = await Vote.create({ title, multi, anonymous, house, section, floor, userId: this.authToken.id });

    // добавляем вопросы к голосованию
    for (let question of questions) {
      const body = question.body;
      if (body != null && body.trim().length != 0) {
        await VoteQuestion.create({ voteId: vote.id, body });
      }
    }

    // генерируем список пользователей, которым доступно голосование
    let residents: Resident[] = [];
    if (type == "house") {
      // весь дом
      residents = await Resident.findAll();
    } else if (type == "section") {
      // весь подъезд
      const flats = await Flat.findAll({ where: { section } });
      residents = await Resident.findAll({ where: { flatId: flats.map(flat => flat.id) } });
    } else if (type == "floor") {
      // весь этаж в подъезде
      const flats = await Flat.findAll({ where: { section, floor } });
      residents = await Resident.findAll({ where: { flatId: flats.map(flat => flat.id) } });
    }
    for (let resident of residents) {
      await VotePerson.create({ voteId: vote.id, personId: resident.personId });
    }

    // обновляем канал "votes"
    const responseUpdate = new ResponseUpdate(this.exchange);
    await responseUpdate.update({
      userId: this.authToken.id,
      createAt: new Date(),
      type: "VOTE.SAVE",
      status: "SUCCESS",
      data: JSON.stringify({ voteId: vote.id, event: "create" })
    });

    respond(null, { status: "OK" });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}

export async function answer({ voteId, answers }, respond) {
  console.log(">>>>> actions/vote.answer");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);
    const person = await Person.findOne({ where: { userId: this.authToken.id } });
    const votePerson = await VotePerson.findOne({ where: { voteId, personId: person.id } });
    if (votePerson == null) throw new Error(errors.vote["002"].code);

    // сохраняем ответы
    if (answers != null && answers.length != 0) {
      for (let questionId of answers) {
        if (questionId != null) await VoteAnswer.create({ voteId, questionId, personId: person.id });
      }
    }

    // обновляем канал "votes"
    const responseUpdate = new ResponseUpdate(this.exchange);
    await responseUpdate.update({
      userId: this.authToken.id,
      createAt: new Date(),
      type: "VOTE.ANSWER.SAVE",
      status: "SUCCESS",
      data: JSON.stringify({ voteId, event: "update" })
    });

    respond(null, { status: "OK" });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}