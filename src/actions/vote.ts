import { Person, VoteAnswer, VotePerson } from "../models";
import ResponseUpdate from "../responses/response.update";
import errors from "./errors";

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