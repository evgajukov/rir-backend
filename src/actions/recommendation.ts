import { Person, Recommendation, User } from "../models";
import ResponseUpdate from "../responses/response.update";
import errors from "./errors";

export async function save({ categoryId, title, body, extra }, respond) {
  console.log(">>>>> actions/recommendation.save");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);
    const user = await User.findByPk(this.authToken.id);
    if (user == null) throw new Error(errors.user["003"].code);
    if (user.banned) throw new Error(errors.user["002"].code);
    if (user.deleted) throw new Error(errors.user["003"].code);

    const person = await Person.findOne({ where: { userId: this.authToken.id } });

    // создаем рекомендацию
    const recommendation = await Recommendation.create({
      categoryId,
      personId: person.id,
      title: title,
      body: body,
      extra: extra
    });

    // обновляем канал "recommendations"
    const responseUpdate = new ResponseUpdate(this.exchange);
    responseUpdate.update({
      userId: this.authToken.id,
      createAt: new Date(),
      type: "RECOMMENDATION.SAVE",
      status: "SUCCESS",
      data: JSON.stringify({ recommendationId: recommendation.id, event: "create" })
    });

    respond(null, { status: "OK" });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}